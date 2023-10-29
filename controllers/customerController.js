const CustomerModel = require('../models/customerModel');

class CustomerController {
    // Create a new customer
    async createCustomer(req, res) {
      try {
        const { name, mobileNo, email } = req.body;
        const customer = await CustomerModel.createCustomer(name, mobileNo, email);
        res.status(201).json(customer);
      } catch (error) {
        res.status(500).json({ error: 'Could not create customer' });
      }
    }
  
    // Get all customers
    async getCustomers(req, res) {
      try {
        const customers = await CustomerModel.getCustomers();
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: 'Could not retrieve customers' });
      }
    }
  
    // Get a single customer by ID
    async getCustomerById(req, res) {
      try {
        const { customerId } = req.params;
        const customer = await CustomerModel.getCustomerById(customerId);
  
        if (!customer) {
          res.status(404).json({ error: 'Customer not found' });
        } else {
          res.status(200).json(customer);
        }
      } catch (error) {
        res.status(500).json({ error: 'Could not retrieve customer' });
      }
    }
  
    // Update a customer
    async updateCustomer(req, res) {
      try {
        const { customerId } = req.params;
        const { name, mobileNo, email } = req.body;
        const updatedCustomer = await CustomerModel.updateCustomer(customerId, name, mobileNo, email);
  
        if (!updatedCustomer) {
          res.status(404).json({ error: 'Customer not found' });
        } else {
          res.status(200).json(updatedCustomer);
        }
      } catch (error) {
        res.status(500).json({ error: 'Could not update customer' });
      }
    }
  
    // Delete a customer
    async deleteCustomer(req, res) {
      try {
        const { customerId } = req.params;
        await CustomerModel.deleteCustomer(customerId);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Could not delete customer' });
      }
    }
  }
  
  module.exports = new CustomerController();