// billRouter.js
const express = require('express');
const router = express.Router();
const BillController = require('../controllers/billController');

// Create a new bill
router.post('/', BillController.createBill);

// Retrieve a bill by ID
router.get('/:id', BillController.getBillById);

// Update a bill by ID
router.put('/:id', BillController.updateBill);

// Delete a bill by ID
router.delete('/:id', BillController.deleteBill);

// Retrieve all bills
router.get('/', BillController.getAllBills);

module.exports = router;
