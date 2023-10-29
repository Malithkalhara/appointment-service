// billController.js
const BillModel = require('../models/billModel');

class BillController {
  // Create a new bill
  async createBill(req, res) {
    try {
      const bill = await BillModel.createBill(req.body);
      res.status(201).json(bill);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Retrieve a bill by ID
  async getBillById(req, res) {
    try {
      const bill = await BillModel.getBillById(req.params.id);
      if (bill) {
        res.status(200).json(bill);
      } else {
        res.status(404).json({ error: 'Bill not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Update a bill
  async updateBill(req, res) {
    // Implement this function as needed
  }

  // Delete a bill by ID
  async deleteBill(req, res) {
    // Implement this function as needed
  }

 async getAllBills(req, res) {
    try {
      const bills = await BillModel.getAllBills();
      res.status(200).json(bills);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new BillController();
