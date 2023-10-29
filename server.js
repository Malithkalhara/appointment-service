const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoute = require('./routes/appointmentRoutes');
const billRoute = require('./routes/billRoutes');
const pool = require('./db');

// instantiate express app
const app = express()
app.use(bodyParser.json());

//setup express app
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', appointmentRoute);
app.use('/api/v1/bills', billRoute);

// port number
const PORT = process.env.SERVER_PORT || 8080

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