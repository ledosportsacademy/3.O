const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single donation
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new donation
router.post('/', async (req, res) => {
  const donation = new Donation({
    donorName: req.body.donorName,
    amount: req.body.amount,
    date: req.body.date,
    purpose: req.body.purpose
  });

  try {
    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a donation
router.put('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (req.body.donorName) donation.donorName = req.body.donorName;
    if (req.body.amount) donation.amount = req.body.amount;
    if (req.body.date) donation.date = req.body.date;
    if (req.body.purpose) donation.purpose = req.body.purpose;

    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a donation
router.delete('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get total donations amount
router.get('/stats/total', async (req, res) => {
  try {
    const result = await Donation.aggregate([
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

module.exports = router;