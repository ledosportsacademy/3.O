const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    category: req.body.category,
    vendor: req.body.vendor,
    paymentMethod: req.body.paymentMethod
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (req.body.description) expense.description = req.body.description;
    if (req.body.amount) expense.amount = req.body.amount;
    if (req.body.date) expense.date = req.body.date;
    if (req.body.category) expense.category = req.body.category;
    if (req.body.vendor) expense.vendor = req.body.vendor;
    if (req.body.paymentMethod) expense.paymentMethod = req.body.paymentMethod;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get expenses by category
router.get('/category/:category', async (req, res) => {
  try {
    const expenses = await Expense.find({ category: req.params.category }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get total expenses amount
router.get('/stats/total', async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    const totalAmount = result.length > 0 ? result[0].total : 0;
    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get expenses by category with totals
router.get('/stats/by-category', async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);
    
    res.json(result.map(item => ({
      category: item._id,
      total: item.total,
      count: item.count
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;