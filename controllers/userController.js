const userModel = require('../models/userModel');

class UserController {
  async createUser(req, res) {
    try {
      const user = req.body;
      const newUser = await userModel.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userModel.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await userModel.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    try {
      const updatedUser = req.body;
      const user = await userModel.updateUser(id, updatedUser);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await userModel.deleteUser(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserByUsername(req, res) {
    const { username } = req.params;
    try {
      const user = await userModel.getUserByUsername(username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
