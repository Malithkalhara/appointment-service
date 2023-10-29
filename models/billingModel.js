const pool = require('../db');

class BillModel {
    // Create a new bill
    async createBill(billData) {
      const { customer_id, item_ids, amount, appointment_id, status, date } = billData;
      const query = 'INSERT INTO appointment.billing (id, customer_id, item_ids, amount, appointment_id, status, date) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6) RETURNING *';
      const values = [customer_id, item_ids, amount, appointment_id, status, date];
      const { rows } = await pool.query(query, values);
      return rows[0];
    }
  
    // Retrieve a bill by ID
    async getBillById(id) {
      const query = 'SELECT * FROM appointment.billing WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    }
  
    // Update a bill
    async updateBill(id, updatedData) {
      // Construct the UPDATE query as per your requirements
      // Execute the query and return the updated record
    }
  
    // Delete a bill by ID
    async deleteBill(id) {
      const query = 'DELETE FROM appointment.billing WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    }
  
    // Retrieve all bills
    async getAllBills() {
      const query = 'SELECT * FROM appointment.billing';
      const { rows } = await pool.query(query);
      return rows;
    }
  }
  
  module.exports = new BillModel();