const crypto = require("crypto");
const VaultItem = require("../models/vaultitems.model");
const userModel = require("../models/user.model");
const { generateEncryptionKey } = require("../utils/cryptoUtil");

module.exports.getVault = async (req, res) => {
    try {
        const userId = req.user._id;
        const key = generateEncryptionKey(userId); // Same as encryption

        const items = await VaultItem.find({ userId });

        const decryptedItems = items.map((item) => {
            const decryptField = (encryptedField) => {
                const { data, iv, tag } = encryptedField;

                const decipher = crypto.createDecipheriv(
                    "aes-256-gcm",
                    key,
                    Buffer.from(iv, "base64")
                );
                decipher.setAuthTag(Buffer.from(tag, "base64"));

                const decrypted = Buffer.concat([
                    decipher.update(Buffer.from(data, "base64")),
                    decipher.final(),
                ]);

                return decrypted.toString("utf8");
            };

            return {
                _id: item._id,
                title: decryptField(item.encryptedData.title),
                username: decryptField(item.encryptedData.username),
                password: decryptField(item.encryptedData.password),
                createdAt: item.createdAt,
            };
        });

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

        const key = generateEncryptionKey(userId); // 256-bit key
        const iv = crypto.randomBytes(12); // 96-bit IV for AES-GCM

        const encryptField = (text) => {
            const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
            const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
            const authTag = cipher.getAuthTag();
            return {
                data: encrypted.toString("base64"),
                iv: iv.toString("base64"),
                tag: authTag.toString("base64"),
            };
        };

        const encryptedTitle = encryptField(title);
        const encryptedUsername = encryptField(username);
        const encryptedPassword = encryptField(password);

        const newItem = new VaultItem({
            userId,
            encryptedData: {
                title: encryptedTitle,
                username: encryptedUsername,
                password: encryptedPassword,
            },
        });

        await newItem.save();

        return res.status(201).json({ message: "Vault item encrypted and saved!"  });


    } catch (error) {
        return res.status(500).json({ errors: ["Internal server error"] });

    }
}


module.exports.updateVault = async (req, res) => {
    try {
        const { id } = req.params;
        const { encryptedData } = req.body;
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ errors: ["User ID is required"] });
        }
        if (!encryptedData) {
            return res.status(400).json({ errors: ["Encrypted data is required"] });
        }
        const vaultItem = await VaultItem.findByIdAndUpdate(id, { encryptedData }, { new: true });
        if (!vaultItem) {
            return res.status(404).json({ errors: ["Vault item not found"] });
        }

        return res.status(200).json({ message: "Vault item updated successfully", vaultItem });


    } catch (error) {
        return res.status(500).json({ errors: ["Internal server error"] });

    }
}

module.exports.deleteVault = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ errors: ["User ID is required"] });
        }
        const vaultItem = await VaultItem.findByIdAndDelete(id);
        if (!vaultItem) {
            return res.status(404).json({ errors: ["Vault item not found"] });
        }

        return res.status(200).json({ message: "Vault item deleted successfully" });


    } catch (error) {
        return res.status(500).json({ errors: ["Internal server error"] });

    }
}


module.exports.getSalt = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModel.findById(userId);
        if (!user || !user.vaultSalt) {
            return res.status(404).json({ error: "Salt not found" });
        }
        return res.status(200).json({ salt: user.vaultSalt });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};




module.exports.generateSalt = async (req, res) => {
    try {
        const userId = req.user._id;
        const salt = crypto.randomBytes(16).toString("hex");

        const user = await userModel.findByIdAndUpdate(userId, {
            vaultSalt: salt,
        }, { new: true });

        return res.status(200).json({ salt: user.vaultSalt });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
};


module.exports.getDummy = async (req, res) => {
    try {
        console.log(req.user._id)
        const dummyItem = await VaultItem.findOne({ userId: req.user._id, isDummy: true });
        if (!dummyItem) return res.status(404).json({ message: "Dummy item not found" });

        res.json(dummyItem);
    } catch (error) {
        console.error("Failed to fetch dummy:", error);
        res.status(500).json({ message: "Server error" });
    }
}