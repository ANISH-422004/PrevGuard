// models/breaches.model.js
const mongoose = require('mongoose');

const breachAlertSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    breaches: [
      {
        source: { type: String },
        date: { type: Date },
        type: { type: String },
        details: { type: String }
      }
    ],
    createdAt: { type: Date, default: Date.now }
  });


const breachAlertModel = mongoose.model('BreachAlert', breachAlertSchema);
module.exports = breachAlertModel;
