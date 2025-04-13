const mongoose = require("mongoose");

const sharedDataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    location: {
      type: String, // Can store coordinates or address
      required: false,
    },
    aadhaarNumber: {
      type: String, // Aadhaar number as a string
      required: false,
    },
  },
  { _id: false } // Prevent creating an _id for the nested sharedData
);

const sharedAppSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appName: {
      type: String,
      required: true,
    },
    sharedData: {
      type: sharedDataSchema, // Now a nested object
      default: {},
    },
    accessDate: {
      type: Date,
      default: Date.now,
    },
    lastAccessed: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SharedApp", sharedAppSchema);
