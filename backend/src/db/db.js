const mongoose = require('mongoose');
const config = require('../config/config');


const connectDB = () => {
    mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err.message)
    })
}


module.exports = connectDB;