const userModel = require("../models/user.model");
const { sendEmail } = require("../services/email.service");
const generateVerificationCode = require("../utils/generateVerificationCode");

module.exports.verifyOTPController = async (req, res) => {
    try {

        const { email, otp } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: ["User not found"] });
        }

        // Check if OTP matches and is not expired
        if (user.verificationToken !== otp || user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({ errors: ["Invalid or expired OTP"] });
        }

        // Update user as verified
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        // Generate Token
        const token = userModel.generateToken(user);

        user.password = undefined

        res.status(200).json({
            message: "OTP Verified. User logged in.",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};


module.exports.resendOTPController = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: ["User not found"] });
        }
        
        
        // Generate new OTP
        const OTP = generateVerificationCode()
        user.isVerified = false; // Reset verification status
        user.verificationToken = OTP;
        user.verificationTokenExpiresAt = Date.now() + 2 * 60 * 1000; // 2 min expiration time
        await user.save();


        // Send OTP to user's email
        const emailContent = `
                <html>
                  <body style="font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #f0f0f0; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
                      <h2 style="color: #088395;">Welcome to Our Platform, ${user.userName}!</h2>
                      <h2 style="color: #088395;">Your OTP</h2>
                      <p style="font-size: 18px; font-weight: bold;">Your OTP is: <span style="color: #37B7C3;">${OTP}</span></p>
                      <p>Thank you for signing up with us. We’re excited to have you onboard!</p>
                      <p>Here’s what you can do next:</p>
                      <ul>
                    <li>Explore our platform</li>
                    <li>Set up your profile</li>
                    <li>Start collaborating with others</li>
                      </ul>
                      <p style="color: #37B7C3;">Happy exploring!</p>
                      <p>Best regards,<br/> The Team</p>
                    </div>
                  </body>
                </html>
                  `;
        await sendEmail(email, 'Verify your account', emailContent)


        res.status(200).json({
            message: "OTP resent successfully"
        });

    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
}