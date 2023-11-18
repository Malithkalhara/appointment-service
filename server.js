const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const billRoutes = require('./routes/billingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const { authenticateToken } = require('./middleware/auth');
const pool = require('./db');
const logger = require('./logger');

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

// instantiate express app
const app = express()
app.use(bodyParser.json());

// Set up CORS middleware
app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with your frontend's URL
      methods: 'GET,POST,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    })
);

//setup express app
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments',authenticateToken, appointmentRoutes);
app.use('/api/v1/billing', authenticateToken, billRoutes);
app.use('/api/v1/services', authenticateToken, serviceRoutes );

// port number
const PORT = process.env.SERVER_PORT || 3000

// Check the database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        logger.error(err.message);
    } else {
        logger.info('Database connected. Server started.');
    }
});

// start server
app.listen(PORT, () => {
    logger.info(`Server started. Listening on port ${PORT}`);
})

// export server for testing
module.exports = app