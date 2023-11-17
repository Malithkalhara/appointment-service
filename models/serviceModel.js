const pool = require('../db');

class ServiceModel {
  // Create a new service
  async createService(name, details, price, type) {
    const query = 'INSERT INTO service.services (name, details, price, type) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, details, price, type];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Read services
  async getServices() {
    const query = 'SELECT * FROM service.services';

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Read a single service by ID
  async getServiceById(serviceId) {
    const query = 'SELECT * FROM service.services WHERE id = $1';
    const values = [serviceId];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update a service
  async updateService(serviceId, name, details, price, type) {
    const query = 'UPDATE service.services SET name = $2, details = $3, price = $4, type = $5 WHERE id = $1 RETURNING *';
    const values = [serviceId, name, details, price, type];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete a service
  async deleteService(serviceId) {
    const query = 'DELETE FROM service.services WHERE id = $1';
    const values = [serviceId];

    try {
      await pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ServiceModel();
