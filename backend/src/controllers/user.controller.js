module.exports.getUserController = async (req, res) => {
    try {
        const user = req.user; // Assuming user is set in the request by authentication middleware

        if (!user) {
            return res.status(404).json({ errors: ["User not found"] });
        }

        // Exclude sensitive information
        user.password = undefined;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        res.status(200).json({
            message: "User fetched successfully",
            user,
        });


    } catch (error) {
        
        console.error(error);
        res.status(500).json({ errors: ["Internal server error"] });
    }


}