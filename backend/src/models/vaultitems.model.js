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
      type: String,
      required: true,
    },

  }, {
    timestamps: true,
  });

  
const VaultItem = mongoose.model('VaultItem', VaultItemSchema);


module.exports = VaultItem;