const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpiresAt: {
        type: Date,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiresAt: {
        type: Date,
    },

}, { timestamps: true });

userSchema.statics.generateHashedPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.statics.generateToken = function (user) {
    return jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET);
};
userSchema.methods.validateToken = function (token) {
    return jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return false;
        }
        return decoded;
    });
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;