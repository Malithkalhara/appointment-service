// auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const logger = require('../logger');
const { getUserByUsername } = require('../models/userModel');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  const secret = process.env.JWT_SECRET;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secret, async (err, user) => {
    if (err) {
      logger.error(err.message);
      return res.sendStatus(403)
    };
    next();
  });
}

module.exports = { authenticateToken };