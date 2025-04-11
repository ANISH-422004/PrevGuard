// controllers/breachController.js
const breachModel = require("../models/breaches.model.js");
const breachAlertModel = require("../models/BreachAlert.model.js");
const userModel = require("../models/user.model.js");

module.exports.getBreachesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const userId = req.user?._id;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Delete previous alert if it exists
    const existingAlert = await breachAlertModel.findOne({ email });

    if (existingAlert) {
      await breachAlertModel.deleteOne({ _id: existingAlert._id });

      if (userId) {
        await userModel.updateOne(
          { _id: userId },
          { $pull: { breachAlerts: existingAlert._id } }
        );
      }
    }

    // Fetch latest breaches from breachModel
    const breaches = await breachModel.find({ email });

    // Create a new alert with updated data
    const newAlert = await breachAlertModel.create({
      email,
      breaches
    });

    if (userId) {
      await userModel.updateOne(
        { _id: userId },
        { $push: { breachAlerts: newAlert._id } }
      );
    }

    return res.status(200).json({ breachAlert: newAlert });
  } catch (error) {
    console.log("Error fetching breaches:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
