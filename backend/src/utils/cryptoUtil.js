const crypto = require('crypto');
const config = require('../config/config');
const VAULT_SECRET_KEY = config.VAULT_SECRET_KEY;

if (!VAULT_SECRET_KEY || VAULT_SECRET_KEY.length < 32) {
  throw new Error("VAULT_SECRET_KEY must be at least 32 characters long");
}

function generateEncryptionKey(userId) {
  return crypto.createHash("sha256").update(VAULT_SECRET_KEY + userId).digest(); // 32 bytes
}

function encryptField(userId, text) {
  const key = generateEncryptionKey(userId);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    data: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };
}

function decryptField(userId, encryptedField) {
  const key = generateEncryptionKey(userId);
  const { data, iv, tag } = encryptedField;
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(data, "base64")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

module.exports = {
  generateEncryptionKey,
  encryptField,
  decryptField,
};
