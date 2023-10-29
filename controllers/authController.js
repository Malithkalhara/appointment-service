const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel'); // Import your user model

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Check if the user exists by username
      const user = await userModel.getUserByUsername(username);

      // Step 2: Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!user || !passwordMatch) {
        return res.sendStatus(403); // Unauthorized
      }

      // Generate a JSON Web Token (JWT) with user information
      const token = jwt.sign({ username: user.username, role: user.role}, process.env.JWT_SECRET);

      // Send the token as a response
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new AuthController();