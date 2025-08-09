const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 20
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  }
});

const weeklyFeeSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  memberName: {
    type: String,
    required: true
  },
  payments: [paymentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('WeeklyFee', weeklyFeeSchema);