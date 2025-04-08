const crypto = require("crypto");
const VaultItem = require("../models/vaultitems.model");
const userModel = require("../models/user.model");

module.exports.getVault = async(req,res)=>{
    try {
            const userId = req.user._id;
            if (!userId) {
                return res.status(400).json({ errors: ["User ID is required"] });
            }
            const vaultItems = await VaultItem.find({ userId, isDummy: { $ne: true } }).sort({ createdAt: -1 });
            if (!vaultItems) {
                return res.status(404).json({ errors: ["No vault items found"] });
            }

            return res.status(200).json({ message: "Vault items fetched successfully", vaultItems });


    } catch (error) {
        return res.status(500).json({ errors: ["Internal server error"] });
        
    }
}


module.exports.addVault = async(req,res)=>{
    try {
        const { encryptedData  , title , isDummy} = req.body;
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ errors: ["Unauthorized"] });
        }
        if (!encryptedData || !title) {
            return res.status(400).json({ errors: ["All fields Required"] });
        }
        const vaultItem = new VaultItem({
            userId,
            encryptedData,
            title,
            isDummy,

        });

        await vaultItem.save();
        return res.status(201).json({ message: "Vault item added successfully", vaultItem });


    } catch (error) {
        return res.status(500).json({ errors: ["Internal server error"] });
        
    }
}   


module.exports.updateVault = async(req,res)=>{
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

module.exports.deleteVault = async(req,res)=>{
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


module.exports.getDummy =  async (req, res) => {
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