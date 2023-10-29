const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');

// Create a new appointment
router.post('/', AppointmentController.createAppointment);
// Get all appointments
router.get('/', AppointmentController.getAppointments);
// Get a single appointment by ID
router.get('/:appointmentId', AppointmentController.getAppointmentById);
// Update an appointment
router.put('/:appointmentId', AppointmentController.updateAppointment);
// Delete an appointment
router.delete('/:appointmentId', AppointmentController.deleteAppointment);

module.exports = router;
