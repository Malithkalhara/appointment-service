const AppointmentModel = require("../models/appointmentModel");
const CustomerModel = require("../models/customerModel");
const logger = require("../logger");

class AppointmentController {
  // Create a new appointment
  async createAppointment(req, res) {
    try {
      const {
        title,
        details,
        customerName,
        customerMobile,
        customerEmail,
        serviceIds,
        appointmentDate,
        appointmentStartTime,
        appointmentEndTime,
      } = req.body;

      try {
        const customer = await CustomerModel.getCustomerByMobileNo(
          customerMobile
        );

        if (customer) {
          const appointment = await AppointmentModel.createAppointment(
            title,
            details,
            customerMobile,
            serviceIds,
            appointmentDate,
            appointmentStartTime,
            appointmentEndTime
          );
          res.status(201).json(appointment);
        } else {
          try {
            await CustomerModel.createCustomer(
              customerName,
              customerMobile,
              customerEmail
            );
          } catch (error) {
            logger.error(error);
            res.status(500).json({
              error: "Could not create customer",
            });
          }

          const appointment = await AppointmentModel.createAppointment(
            title,
            details,
            customerMobile,
            serviceIds,
            appointmentDate,
            appointmentStartTime,
            appointmentEndTime
          );
          res.status(201).json(appointment);
        }
      } catch (error) {
        res.status(500).json({
          error: "Could not check customer existence or create customer",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Could not create appointment" });
    }
  }

  // Get all appointments
  async getAppointments(req, res) {
    try {
      const appointments = await AppointmentModel.getAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve appointments" });
    }
  }

  // Get a single appointment by ID
  async getAppointmentById(req, res) {
    try {
      const { appointmentId } = req.params;
      const appointment = await AppointmentModel.getAppointmentById(
        appointmentId
      );

      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
      } else {
        res.status(200).json(appointment);
      }
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve appointment" });
    }
  }

  // Update an appointment
  async updateAppointment(req, res) {
    try {
      const { appointmentId } = req.params;
      const {
        title,
        details,
        itemIds,
        appointmentDate,
        appointmentTime,
        timeDuration,
      } = req.body;
      const updatedAppointment = await AppointmentModel.updateAppointment(
        appointmentId,
        title,
        details,
        itemIds,
        appointmentDate,
        appointmentTime,
        timeDuration
      );

      if (!updatedAppointment) {
        res.status(404).json({ error: "Appointment not found" });
      } else {
        res.status(200).json(updatedAppointment);
      }
    } catch (error) {
      res.status(500).json({ error: "Could not update appointment" });
    }
  }

  // Delete an appointment
  async deleteAppointment(req, res) {
    try {
      const { appointmentId } = req.params;
      await AppointmentModel.deleteAppointment(appointmentId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Could not delete appointment" });
    }
  }
}

module.exports = new AppointmentController();
