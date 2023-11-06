const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoute = require('./routes/appointmentRoutes');
const billRoute = require('./routes/billingRoutes');
const pool = require('./db');

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
      allowedHeaders: 'Content-Type',
      credentials: true,
    })
);

//setup express app
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', appointmentRoute);
app.use('/api/v1/billing', billRoute);

// port number
const PORT = process.env.SERVER_PORT || 3000

// Check the database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected. Server started.');
    }
});


// start server
app.listen(PORT, () => {
    console.log(`Server started. Listening on port ${PORT}`)
})

// export server for testing
module.exports = app