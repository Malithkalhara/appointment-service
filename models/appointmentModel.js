const pool = require('../db');

class AppointmentModel {
    // Create a new appointment
    async createAppointment(title, details, customerId, itemIds, date) {
      const query = 'INSERT INTO Appointments (title, details, customer_id, item_ids, date) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [title, details, customerId, itemIds, date];
  
      try {
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
  
    // Read appointments
    async getAppointments() {
      const query = 'SELECT * FROM Appointments';
  
      try {
        const { rows } = await pool.query(query);
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    // Read a single appointment by ID
    async getAppointmentById(appointmentId) {
      const query = 'SELECT * FROM Appointments WHERE id = $1';
      const values = [appointmentId];
  
      try {
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
  
    // Update an appointment
    async updateAppointment(appointmentId, title, details, itemIds) {
      const query = 'UPDATE Appointments SET title = $2, details = $3, item_ids = $4 WHERE id = $1 RETURNING *';
      const values = [appointmentId, title, details, itemIds];
  
      try {
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
  
    // Delete an appointment
    async deleteAppointment(appointmentId) {
      const query = 'DELETE FROM Appointments WHERE id = $1';
      const values = [appointmentId];
  
      try {
        await pool.query(query, values);
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = new AppointmentModel();