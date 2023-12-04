const pool = require("../db");

class CustomerModel {
  // Create a new customer
  async createCustomer(name, mobileNo, email) {
    const query =
      "INSERT INTO appointment.customers (name, mobile_no, email) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, mobileNo, email];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Read customers
  async getCustomers() {
    const query = "SELECT * FROM appointment.customers";

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Read a single customer by ID
  async getCustomerById(customerId) {
    const query = "SELECT * FROM appointment.customers WHERE id = $1";
    const values = [customerId];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getCustomerByMobileNo(mobileNo) {
    const query = "SELECT * FROM appointment.customers WHERE mobile_no = $1";
    const values = [mobileNo];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update a customer
  async updateCustomer(customerId, name, mobileNo, email) {
    const query =
      "UPDATE appointment.customers SET name = $2, mobile_no = $3, email = $4 WHERE id = $1 RETURNING *";
    const values = [customerId, name, mobileNo, email];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete a customer
  async deleteCustomer(customerId) {
    const query = "DELETE FROM appointment.customers WHERE id = $1";
    const values = [customerId];

    try {
      await pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CustomerModel();
