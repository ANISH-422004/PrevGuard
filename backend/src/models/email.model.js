// models/Email.js
const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  to: String,
  from: String,
  subject: String,
  text: String,
  html: String,
  receivedAt: {
    type: Date,
    default: Date.now
  },
});

const emailModel = mongoose.model("Email", EmailSchema);

module.exports = emailModel
