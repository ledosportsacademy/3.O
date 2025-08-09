const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get activities by status
router.get('/status/:status', async (req, res) => {
  try {
    const activities = await Activity.find({ status: req.params.status }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single activity
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new activity
router.post('/', async (req, res) => {
  const activity = new Activity({
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    description: req.body.description,
    image: req.body.image,
    status: req.body.status,
    redirectUrl: req.body.redirectUrl,
    openNewTab: req.body.openNewTab
  });

  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an activity
router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (req.body.title) activity.title = req.body.title;
    if (req.body.date) activity.date = req.body.date;
    if (req.body.time) activity.time = req.body.time;
    if (req.body.description) activity.description = req.body.description;
    if (req.body.image !== undefined) activity.image = req.body.image;
    if (req.body.status) activity.status = req.body.status;
    if (req.body.redirectUrl !== undefined) activity.redirectUrl = req.body.redirectUrl;
    if (req.body.openNewTab !== undefined) activity.openNewTab = req.body.openNewTab;

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;