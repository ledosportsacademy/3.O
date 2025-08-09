const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Equipment',
      'Maintenance',
      'Transportation',
      'Utilities',
      'Medical',
      'Tournament',
      'Marketing',
      'Insurance',
      'Food & Beverage',
      'Office'
    ]
  },
  vendor: {
    type: String,
    required: true,
    trim: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Bank Transfer', 'UPI', 'Card', 'Online']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);