// models/Breach.js
const mongoose = require("mongoose");

const breachSchema = new mongoose.Schema({
  email: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String },
  details: { type: String }
});

const breachModel = mongoose.model("Breach", breachSchema);

module.exports = breachModel;
