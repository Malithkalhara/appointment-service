// auth.js
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../models/userModel');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    const dbUser = await getUserByUsername(user.username);
    req.user = dbUser;
    next();
  });
}

module.exports = { authenticateToken };