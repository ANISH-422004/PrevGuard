const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const OTPRoutes = require('./routes/otp.routes');
const userRoutes = require('./routes/user.routes');
const vaultRoutes = require('./routes/vault.routes');
const fakeDataRoutes = require("./routes/fakeData.routes");
const sharedDataRoutes = require("./routes/sharedData.routes");
const blogRoutes = require("./routes/blog.routes");
const breachRoutes = require('./routes/breaches.routes');
const config = require('./config/config');



// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin  : config.FRONTEND_URL
}));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.use('/api/auth', authRoutes);
app.use('/api/otp', OTPRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vault', vaultRoutes);
app.use("/api/fake-data", fakeDataRoutes);
app.use("/api/sharedApps", sharedDataRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/breaches', breachRoutes);



// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});



// Export the app
module.exports = app;