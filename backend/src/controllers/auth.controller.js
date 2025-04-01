const userModel = require("../models/user.model")
const { createUser } = require("../services/auth.service")
const { sendEmail } = require("../services/email.service")
const generateVerificationCode = require("../utils/generateVerificationCode")

module.exports.registerController = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body

        // Validate input
        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({
                errors: ['All fields are required'],
            })
        }


        //create user Service
        const OTP = generateVerificationCode()
        const newUser = await createUser({ firstName, lastName, email, password, phoneNumber, OTP })

        //send OTP by email
        const username = firstName.trim() + ` ${lastName.trim()}`
        const emailContent = `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="background-color: #f0f0f0; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #088395;">Welcome to Our Platform, ${username}!</h2>
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



        // Generate token
        const token = userModel.generateToken(newUser)


        // Send response
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            token,
        })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            errors: [error.message],
        })
    }
}