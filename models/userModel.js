const pool = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserModel {
  async createUser(user) {
    const { username, password, name, email, mobile_number, role } = user;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = 'INSERT INTO appointment.users (username, password, name, email, mobile_number, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [username, hashedPassword, name, email, mobile_number, role];
    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  async getUsers() {
    const query = 'SELECT * FROM appointment.users';
    const { rows } = await pool.query(query);
    return rows;
  }

  async getUserById(id) {
    const query = 'SELECT * FROM appointment.users WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async updateUser(id, updatedUser) {
    const { username, password, name, email, mobile_number } = updatedUser;
    const query = 'UPDATE appointment.users SET username = $1, password = $2, name = $3, email = $4, mobile_number = $5 WHERE id = $6 RETURNING *';
    const values = [username, password, name, email, mobile_number, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async deleteUser(id) {
    const query = 'DELETE FROM appointment.users WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async getUserByUsername(username) {
    const query = 'SELECT * FROM appointment.users WHERE username = $1';
    const values = [username];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = new UserModel();
