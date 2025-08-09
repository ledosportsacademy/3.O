const express = require('express');
const router = express.Router();
const WeeklyFee = require('../models/WeeklyFee');
const Member = require('../models/Member');

// Get all weekly fees
router.get('/', async (req, res) => {
  try {
    const weeklyFees = await WeeklyFee.find().sort({ memberName: 1 });
    res.json(weeklyFees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get weekly fees for a specific member
router.get('/member/:memberId', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findOne({ memberId: req.params.memberId });
    if (!weeklyFee) {
      return res.status(404).json({ message: 'Weekly fee record not found for this member' });
    }
    res.json(weeklyFee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a payment to a member's weekly fee record
router.post('/payment/:memberId', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findOne({ memberId: req.params.memberId });
    if (!weeklyFee) {
      return res.status(404).json({ message: 'Weekly fee record not found for this member' });
    }

    const newPayment = {
      date: req.body.date,
      amount: req.body.amount || 20,
      status: req.body.status || 'pending'
    };

    // Check if payment for this date already exists
    const existingPaymentIndex = weeklyFee.payments.findIndex(p => p.date === newPayment.date);
    
    if (existingPaymentIndex !== -1) {
      // Update existing payment
      weeklyFee.payments[existingPaymentIndex] = newPayment;
    } else {
      // Add new payment
      weeklyFee.payments.push(newPayment);
    }

    // Sort payments by date (newest first)
    weeklyFee.payments.sort((a, b) => new Date(b.date) - new Date(a.date));

    const updatedWeeklyFee = await weeklyFee.save();
    res.json(updatedWeeklyFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update payment status
router.put('/payment/:memberId/:paymentDate', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findOne({ memberId: req.params.memberId });
    if (!weeklyFee) {
      return res.status(404).json({ message: 'Weekly fee record not found for this member' });
    }

    const paymentIndex = weeklyFee.payments.findIndex(p => p.date === req.params.paymentDate);
    if (paymentIndex === -1) {
      return res.status(404).json({ message: 'Payment not found for this date' });
    }

    weeklyFee.payments[paymentIndex].status = req.body.status;
    if (req.body.amount) {
      weeklyFee.payments[paymentIndex].amount = req.body.amount;
    }

    const updatedWeeklyFee = await weeklyFee.save();
    res.json(updatedWeeklyFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a payment
router.delete('/payment/:memberId/:paymentDate', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findOne({ memberId: req.params.memberId });
    if (!weeklyFee) {
      return res.status(404).json({ message: 'Weekly fee record not found for this member' });
    }

    weeklyFee.payments = weeklyFee.payments.filter(p => p.date !== req.params.paymentDate);

    const updatedWeeklyFee = await weeklyFee.save();
    res.json(updatedWeeklyFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get fee collection statistics
router.get('/stats/collection', async (req, res) => {
  try {
    const weeklyFees = await WeeklyFee.find();
    
    let stats = {
      totalCollected: 0,
      pending: 0,
      paid: 0,
      overdue: 0
    };

    weeklyFees.forEach(fee => {
      fee.payments.forEach(payment => {
        if (payment.status === 'paid') {
          stats.totalCollected += payment.amount;
          stats.paid++;
        } else if (payment.status === 'pending') {
          stats.pending++;
        } else if (payment.status === 'overdue') {
          stats.overdue++;
        }
      });
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;