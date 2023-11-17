const ServiceModel = require('../models/serviceModel');

class ServiceController {
  // Create a new service
  async createService(req, res) {
    try {
      const { name, details, price, type } = req.body;
      const service = await ServiceModel.createService(name, details, price, type);
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ error: 'Could not create service' });
    }
  }

  // Get all services
  async getServices(req, res) {
    try {
      const services = await ServiceModel.getServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve services' });
    }
  }

  // Get a single service by ID
  async getServiceById(req, res) {
    try {
      const { serviceId } = req.params;
      const service = await ServiceModel.getServiceById(serviceId);

      if (!service) {
        res.status(404).json({ error: 'Service not found' });
      } else {
        res.status(200).json(service);
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve service' });
    }
  }

  // Update a service
  async updateService(req, res) {
    try {
      const { serviceId } = req.params;
      const { name, details, price, type } = req.body;
      const updatedService = await ServiceModel.updateService(serviceId, name, details, price, type);

      if (!updatedService) {
        res.status(404).json({ error: 'Service not found' });
      } else {
        res.status(200).json(updatedService);
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not update service' });
    }
  }

  // Delete a service
  async deleteService(req, res) {
    try {
      const { serviceId } = req.params;
      await ServiceModel.deleteService(serviceId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Could not delete service' });
    }
  }
}

module.exports = new ServiceController();
