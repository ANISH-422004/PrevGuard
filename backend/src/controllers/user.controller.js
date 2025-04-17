const { uploadBufferStream  , deleteImage  } = require("../utils/imageKit");
const userModel = require("../models/user.model");




module.exports.getUserById = async (req, res) => {
    
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId)
            .select("-password -vaultPassword -__v")
            .populate("savedFakeData")
            .populate("sharedData")
            
            

        if (!user) {
            return res.status(404).json({ errors: ["User not found"] });
        }

        return res.status(200).json({ user });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: [error.message] });
    }
}


module.exports.updateUserProfile = async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const updateFields = {
        username: req.body.username || user.username,
        phoneNumber: req.body.phoneNumber || user.phoneNumber,
      };
  
      // Handle profile picture
      if (req.file) {
        const DEFAULT_PROFILE_URL = "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg";
  
        if (user.profilePicture !== DEFAULT_PROFILE_URL && user.imageKitFileId) { // for 2nd or more time update 
          await deleteImage(user.imageKitFileId);
          console.log("Previous image deleted");
        }
  
        const uploadResult = await uploadBufferStream(req.file.buffer);
        updateFields.profilePicture = uploadResult.url;
        updateFields.imageKitFileId = uploadResult.fileId;
      }

  
    const updatedUser = await userModel.findByIdAndUpdate(req.user.id, updateFields, { new: true })
      .select("-password -vaultPassword -__v")
      .populate("savedFakeData")
      .populate("sharedData");
      //AGGRIGATING ALL THE FIELDS 

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Update failed:", error);
      res.status(500).json({ message: "Profile update failed" });
    }
  };
