const userModel = require("../models/user.model")

module.exports.createUser = async ({ firstName, lastName, email, password, phoneNumber , OTP }) => {
    // Check if user already exists
    const userExists = await userModel.findOne({ email })
    if (userExists) {
        console.log(userExists)
        throw new Error('User already exists')
    }
    // Hash password
    const hashedPassword = userModel.generateHashedPassword(password)

    const username = firstName.trim() + ` ${lastName.trim()}`


    // Create new user
    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        verificationToken: OTP,
        verificationTokenExpiresAt: Date.now() + 2 * 60 * 1000, // 2 min expiration time
    })


    if(!newUser) {
        throw new Error('User creation failed')
    }

    // delete password from user object
    newUser.password = undefined

    return newUser


}