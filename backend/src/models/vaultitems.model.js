const mongoose = require('mongoose');

const VaultItemSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title:{
        type: String,
        required: true,
    },
    encryptedData: {
      iv: String,
      data: String
    },
    isDummy: {
      type: Boolean,
      default: false,
    },

  }, {
    timestamps: true,
  });


const VaultItem = mongoose.model('VaultItem', VaultItemSchema);


module.exports = VaultItem;