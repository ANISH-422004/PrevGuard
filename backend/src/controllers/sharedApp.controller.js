const SharedApp = require("../models/SharedApp.model");
const userModel = require("../models/user.model");

const getSharedApps = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetching the user with populated sharedData
    const user = await userModel.findById(userId).populate("sharedData");

    res.json(user.sharedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const addSharedApp = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appName, sharedData, accessDate, lastAccessed } = req.body;

    // Create a new shared app document
    const newApp = new SharedApp({
      userId,
      appName,
      sharedData, // We directly save the sharedData as it is a nested object
      accessDate,
      lastAccessed,
    });

    // Save the new shared app
    await newApp.save();

    // Push reference to user's sharedData array
    await userModel.findByIdAndUpdate(userId, {
      $push: { sharedData: newApp._id },
    });

    res.status(201).json(newApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateSharedApp = async (req, res) => {
  try {
    const appId = req.params.id;
    const updatedData = req.body; // The entire updated data object will come in the body

    // Find and update the shared app document
    const updatedApp = await SharedApp.findByIdAndUpdate(appId, updatedData, {
      new: true,
    });

    if (!updatedApp) {
      return res.status(404).json({ message: "Shared app not found" });
    }

    res.json(updatedApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteSharedApp = async (req, res) => {
  try {
    const userId = req.user.id;
    const appId = req.params.id;

    // Find and delete the shared app document
    const deletedApp = await SharedApp.findByIdAndDelete(appId);

    if (!deletedApp) {
      return res.status(404).json({ message: "Shared app not found" });
    }

    // Remove the reference to the shared app from the user's sharedData array
    await userModel.findByIdAndUpdate(userId, {
      $pull: { sharedData: appId },
    });

    res.json({ message: "App deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getSharedApps,
  addSharedApp,
  updateSharedApp,
  deleteSharedApp,
};
