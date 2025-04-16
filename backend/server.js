const env = require('dotenv').config()
const app = require('./src/app.js');
const config = require('./src/config/config');
require("./src/utils/fetchPrivacyNews.js");


app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
})



const connectDB = require('./src/db/db.js')
connectDB()