const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/serviceController');

// Create a new service
router.post('/', ServiceController.createService);
// Get all services
router.get('/', ServiceController.getServices);
// Get a single service by ID
router.get('/:serviceId', ServiceController.getServiceById);
// Update a service
router.put('/:serviceId', ServiceController.updateService);
// Delete a service
router.delete('/:serviceId', ServiceController.deleteService);

module.exports = router;
