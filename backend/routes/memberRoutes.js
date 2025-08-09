const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const WeeklyFee = require('../models/WeeklyFee');

// Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ name: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new member
router.post('/', async (req, res) => {
  const member = new Member({
    name: req.body.name,
    contact: req.body.contact,
    phone: req.body.phone,
    role: req.body.role,
    joinDate: req.body.joinDate,
    image: req.body.image
  });

  try {
    const newMember = await member.save();
    
    // Create an initial weekly fee record for the new member
    const weeklyFee = new WeeklyFee({
      memberId: newMember._id,
      memberName: newMember.name,
      payments: []
    });
    await weeklyFee.save();
    
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a member
router.put('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    if (req.body.name) {
      member.name = req.body.name;
      // Update member name in weekly fees collection
      await WeeklyFee.updateOne(
        { memberId: member._id },
        { memberName: req.body.name }
      );
    }
    if (req.body.contact) member.contact = req.body.contact;
    if (req.body.phone) member.phone = req.body.phone;
    if (req.body.role) member.role = req.body.role;
    if (req.body.joinDate) member.joinDate = req.body.joinDate;
    if (req.body.image !== undefined) member.image = req.body.image;

    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Delete member's weekly fee records
    await WeeklyFee.deleteOne({ memberId: member._id });
    
    // Delete the member
    await Member.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search members
router.get('/search/:query', async (req, res) => {
  try {
    const searchRegex = new RegExp(req.params.query, 'i');
    const members = await Member.find({
      $or: [
        { name: searchRegex },
        { role: searchRegex },
        { contact: searchRegex },
        { phone: searchRegex }
      ]
    }).sort({ name: 1 });
    
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;