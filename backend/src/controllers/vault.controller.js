const VaultItem = require("../models/vaultitems.model");
const { encryptField, decryptField } = require("../utils/cryptoUtil");

module.exports.getVault = async (req, res) => {
  try {
    const userId = req.user._id;
    const items = await VaultItem.find({ userId });

    const decryptedItems = items.map(item => ({
      _id: item._id,
      title: decryptField(userId, item.encryptedData.title),
      username: decryptField(userId, item.encryptedData.username),
      password: decryptField(userId, item.encryptedData.password),
      createdAt: item.createdAt,
    }));

    return res.status(200).json(decryptedItems);
  } catch (err) {
    console.error("Vault Get Error:", err);
    return res.status(500).json({ errors: [err.message] });
  }
};

module.exports.addVault = async (req, res) => {
  try {
    const { title, username, password } = req.body;
    const userId = req.user._id;

    if (!title || !username || !password) {
      return res.status(400).json({ errors: ["All fields are required."] });
    }

    const newItem = new VaultItem({
      userId,
      encryptedData: {
        title: encryptField(userId, title),
        username: encryptField(userId, username),
        password: encryptField(userId, password),
      },
    });

    await newItem.save();
    return res.status(201).json({ message: "Vault item encrypted and saved!" });

  } catch (error) {
    return res.status(500).json({ errors: ["Internal server error"] });
  }
};

module.exports.updateVault = async (req, res) => {
  try {
    const userId = req.user._id;
    const vaultId = req.params.id;
    const { title, username, password } = req.body;

    const vaultItem = await VaultItem.findOne({ _id: vaultId, userId });
    if (!vaultItem) {
      return res.status(404).json({ errors: ["Vault item not found"] });
    }

    if (title) vaultItem.encryptedData.title = encryptField(userId, title);
    if (username) vaultItem.encryptedData.username = encryptField(userId, username);
    if (password) vaultItem.encryptedData.password = encryptField(userId, password);

    await vaultItem.save();
    return res.status(200).json({ message: "Vault item updated successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports.deleteVault = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const vaultItem = await VaultItem.findOneAndDelete({ _id: id, userId });
    if (!vaultItem) {
      return res.status(404).json({ errors: ["Vault item not found"] });
    }

    return res.status(200).json({ message: "Vault item deleted successfully" });

  } catch (error) {
    return res.status(500).json({ errors: ["Internal server error"] });
  }
};
