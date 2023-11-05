const pool = require('../db');

class AppointmentModel {
    // Create a new appointment
    async createAppointment(title, details, customerId, itemIds, appointmentDate, appointmentTime, timeDuration) {
      const query = 'INSERT INTO appointment.appointments (title, details, customer_id, item_ids, appointment_date, appointment_time, time_duration) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [title, details, customerId, itemIds, appointmentDate, appointmentTime, timeDuration];
  
      try {
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
  
    // Read appointments
    async getAppointments() {
      const query = 'SELECT * FROM appointment.appointments';
  
      try {
        const { rows } = await pool.query(query);
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    // Read a single appointment by ID
    async getAppointmentById(appointmentId) {
      const query = 'SELECT * FROM appointment.appointments WHERE id = $1';
      const values = [appointmentId];
  
      try {
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
  
    // Update an appointment
    async updateAppointment(appointmentId, title, details, itemIds, appointmentDate, appointmentTime, timeDuration) {
      const query = 'UPDATE appointment.appointments SET title = $2, details = $3, item_ids = $4, appointment_date = $5, appointment_time = $=6, time_Duration = $7 WHERE id = $1 RETURNING *';
      const values = [appointmentId, title, details, itemIds, appointmentDate, appointmentTime, timeDuration];
  
      try {
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
  
    // Delete an appointment
    async deleteAppointment(appointmentId) {
      const query = 'DELETE FROM appointment.appointments WHERE id = $1';
      const values = [appointmentId];
  
      try {
        await pool.query(query, values);
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = new AppointmentModel();