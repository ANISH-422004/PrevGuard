const SharedApp = require("../models/SharedApp.model");
const userModel = require("../models/user.model");

// Get all shared apps for the logged-in user
const getSharedApps = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all apps created by the user
    const sharedApps = await SharedApp.find({ userId });

    res.json(sharedApps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new shared app
const addSharedApp = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appName, sharedData, accessDate, lastAccessed } = req.body;

    // Validate sharedData to only contain booleans
    const validatedSharedData = {
      email: !!sharedData.email,
      password: !!sharedData.password,
      phoneNumber: !!sharedData.phoneNumber,
      location: !!sharedData.location,
      aadhaarNumber: !!sharedData.aadhaarNumber,
    };

    const newApp = new SharedApp({
      userId,
      appName,
      sharedData: validatedSharedData,
      accessDate,
      lastAccessed,
    });

    await newApp.save();

    // Add app reference to user's sharedData array
    await userModel.findByIdAndUpdate(userId, {
      $push: { sharedData: newApp._id },
    });

    res.status(201).json(newApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a shared app
const updateSharedApp = async (req, res) => {
  try {
    const appId = req.params.id;
    const { appName, sharedData } = req.body;

    const updatedSharedData = {
      email: !!sharedData.email,
      password: !!sharedData.password,
      phoneNumber: !!sharedData.phoneNumber,
      location: !!sharedData.location,
      aadhaarNumber: !!sharedData.aadhaarNumber,
    };

    const updatedApp = await SharedApp.findByIdAndUpdate(
      appId,
      {
        appName,
        sharedData: updatedSharedData,
        lastAccessed: new Date(),
      },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ message: "Shared app not found" });
    }

    res.json(updatedApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a shared app
const deleteSharedApp = async (req, res) => {
  try {
    const userId = req.user.id;
    const appId = req.params.id;

    const deletedApp = await SharedApp.findByIdAndDelete(appId);

    if (!deletedApp) {
      return res.status(404).json({ message: "Shared app not found" });
    }

    await userModel.findByIdAndUpdate(userId, {
      $pull: { sharedData: appId },
    });

    res.json({ message: "App deleted successfully" });
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
