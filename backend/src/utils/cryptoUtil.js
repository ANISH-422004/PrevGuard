const crypto = require('crypto');
const config = require('../config/config');
const VAULT_SECRET_KEY = config.VAULT_SECRET_KEY


if (!VAULT_SECRET_KEY || VAULT_SECRET_KEY.length < 32) {
    throw new Error("VAULT_SECRET_KEY must be at least 32 characters long");
}

module.exports.generateEncryptionKey = function (userId) {
    return crypto
        .createHash("sha256")
        .update(VAULT_SECRET_KEY + userId)
        .digest(); // returns a 32-byte Buffer
}