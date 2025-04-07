const userModel = require("../models/user.model");
module.exports.authUser = async(req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ errors: ["Unauthorized"] });
        }

        // Verify token and extract user data
        const decoded = await userModel.validateToken(token);

        if (!decoded) {
            return res.status(401).json({ errors: ["Unauthorized"] });
        }

        // Find user by ID
        const user = await userModel.findById(decoded.id).select("-password -verificationToken -verificationTokenExpiresAt");

        if (!user) {
            return res.status(401).json({ errors: ["Unauthorized"] });
        }

        req.user = user; // Attach user to request object

        next(); // Proceed to the next middleware or route handler



        
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ errors: ["Internal server error"] });

    }

}