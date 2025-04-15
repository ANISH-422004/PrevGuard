const userModel = require("../models/user.model");



module.exports.getUserById = async (req, res) => {
    
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId)
            .select("-password -__v")
            .populate("savedFakeData")
            .populate("sharedData")
            .populate("breachAlerts")
            

        if (!user) {
            return res.status(404).json({ errors: ["User not found"] });
        }

        return res.status(200).json({ user });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: [error.message] });
    }
}