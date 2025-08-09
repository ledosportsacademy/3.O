const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top 5 gallery items
router.get('/top-five', async (req, res) => {
  try {
    const topFive = await Gallery.find({ isTopFive: true }).sort({ order: 1 });
    res.json(topFive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get gallery items by album
router.get('/album/:album', async (req, res) => {
  try {
    const album = req.params.album;
    const galleryItems = await Gallery.find({ album: album }).sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single gallery item
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new gallery item
router.post('/', async (req, res) => {
  // Validate URL
  if (!req.body.url.startsWith('http://') && !req.body.url.startsWith('https://')) {
    return res.status(400).json({ message: 'Please enter a valid image URL starting with http:// or https://' });
  }

  const galleryItem = new Gallery({
    title: req.body.title,
    url: req.body.url,
    album: req.body.album || '',
    isTopFive: req.body.isTopFive || false,
    order: req.body.order || 0
  });

  try {
    const newGalleryItem = await galleryItem.save();
    res.status(201).json(newGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a gallery item
router.put('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Validate URL if provided
    if (req.body.url && !req.body.url.startsWith('http://') && !req.body.url.startsWith('https://')) {
      return res.status(400).json({ message: 'Please enter a valid image URL starting with http:// or https://' });
    }

    if (req.body.title) galleryItem.title = req.body.title;
    if (req.body.url) galleryItem.url = req.body.url;
    if (req.body.album !== undefined) galleryItem.album = req.body.album;
    if (req.body.isTopFive !== undefined) galleryItem.isTopFive = req.body.isTopFive;
    if (req.body.order !== undefined) galleryItem.order = req.body.order;

    const updatedGalleryItem = await galleryItem.save();
    res.json(updatedGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a gallery item
router.delete('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle top five status
router.put('/toggle-top-five/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Count current top five items
    const topFiveCount = await Gallery.countDocuments({ isTopFive: true });

    // If trying to add to top five but already have 5 items
    if (!galleryItem.isTopFive && topFiveCount >= 5) {
      return res.status(400).json({ message: 'Cannot add more than 5 items to Top Five. Remove an item first.' });
    }

    galleryItem.isTopFive = !galleryItem.isTopFive;
    
    // If adding to top five, set order to the end
    if (galleryItem.isTopFive) {
      galleryItem.order = topFiveCount;
    } else {
      galleryItem.order = 0;
      // Reorder remaining top five items
      await Gallery.updateMany(
        { isTopFive: true, order: { $gt: galleryItem.order } },
        { $inc: { order: -1 } }
      );
    }

    const updatedGalleryItem = await galleryItem.save();
    res.json(updatedGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update top five order
router.put('/update-order', async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid request format. Expected an array of items.' });
    }

    // Update each item's order
    for (let i = 0; i < items.length; i++) {
      await Gallery.findByIdAndUpdate(items[i].id, { order: i });
    }

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;