const pool = require('../db');

class CustomerModel {
    // Create a new customer
    async createCustomer(name, mobileNo, email) {
      const query = 'INSERT INTO Customers (name, mobile_no, email) VALUES ($1, $2, $3) RETURNING *';
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
      const query = 'SELECT * FROM Customers';
  
      try {
        const { rows } = await pool.query(query);
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    // Read a single customer by ID
    async getCustomerById(customerId) {
      const query = 'SELECT * FROM Customers WHERE id = $1';
      const values = [customerId];
  
      try {
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
  
    // Update a customer
    async updateCustomer(customerId, name, mobileNo, email) {
      const query = 'UPDATE Customers SET name = $2, mobile_no = $3, email = $4 WHERE id = $1 RETURNING *';
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
      const query = 'DELETE FROM Customers WHERE id = $1';
      const values = [customerId];
  
      try {
        await pool.query(query, values);
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = new CustomerModel();