const mongoose = require('mongoose');

const VaultItemSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    encryptedData: {
      title: {
        data: String,
        iv: String,
        tag: String,
      },
      username: {
        data: String,
        iv: String,
        tag: String,
      },
      password: {
        data: String,
        iv: String,
        tag: String,
      },
    },
    createdAt: { type: Date, default: Date.now },

  });

  VaultItemSchema.index({ userId: 1 });

const VaultItem = mongoose.model('VaultItem', VaultItemSchema);


module.exports = VaultItem;