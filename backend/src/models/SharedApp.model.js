const mongoose = require("mongoose");

const sharedDataSchema = new mongoose.Schema(
  {
    email: {
      type: Boolean,
      default: false,
    },
    password: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: Boolean,
      default: false,
    },
    location: {
      type: Boolean,
      default: false,
    },
    aadhaarNumber: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false } // No separate _id for nested sharedData object
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
      type: sharedDataSchema,
      default: () => ({}),
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
