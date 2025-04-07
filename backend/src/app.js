const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const OTPRoutes = require('./routes/otp.routes');
const userRoutes = require('./routes/user.routes');
const vaultRoutes = require('./routes/vault.routes');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
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


// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});



// Export the app
module.exports = app;