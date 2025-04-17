const mongoose = require("mongoose");

const FakeDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  aadhar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const fakeDataModel = mongoose.model("FakeData", FakeDataSchema);
module.exports = fakeDataModel;
