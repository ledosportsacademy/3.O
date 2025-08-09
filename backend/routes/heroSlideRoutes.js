const express = require('express');
const router = express.Router();
const HeroSlide = require('../models/HeroSlide');

// Get all hero slides
router.get('/', async (req, res) => {
  try {
    const heroSlides = await HeroSlide.find().sort({ createdAt: -1 });
    res.json(heroSlides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single hero slide
router.get('/:id', async (req, res) => {
  try {
    const heroSlide = await HeroSlide.findById(req.params.id);
    if (!heroSlide) {
      return res.status(404).json({ message: 'Hero slide not found' });
    }
    res.json(heroSlide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new hero slide
router.post('/', async (req, res) => {
  const heroSlide = new HeroSlide({
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    backgroundImage: req.body.backgroundImage,
    ctaText: req.body.ctaText,
    ctaLink: req.body.ctaLink,
    redirectUrl: req.body.redirectUrl,
    openNewTab: req.body.openNewTab
  });

  try {
    const newHeroSlide = await heroSlide.save();
    res.status(201).json(newHeroSlide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a hero slide
router.put('/:id', async (req, res) => {
  try {
    const heroSlide = await HeroSlide.findById(req.params.id);
    if (!heroSlide) {
      return res.status(404).json({ message: 'Hero slide not found' });
    }

    if (req.body.title) heroSlide.title = req.body.title;
    if (req.body.subtitle) heroSlide.subtitle = req.body.subtitle;
    if (req.body.description) heroSlide.description = req.body.description;
    if (req.body.backgroundImage) heroSlide.backgroundImage = req.body.backgroundImage;
    if (req.body.ctaText) heroSlide.ctaText = req.body.ctaText;
    if (req.body.ctaLink !== undefined) heroSlide.ctaLink = req.body.ctaLink;
    if (req.body.redirectUrl !== undefined) heroSlide.redirectUrl = req.body.redirectUrl;
    if (req.body.openNewTab !== undefined) heroSlide.openNewTab = req.body.openNewTab;

    const updatedHeroSlide = await heroSlide.save();
    res.json(updatedHeroSlide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a hero slide
router.delete('/:id', async (req, res) => {
  try {
    const heroSlide = await HeroSlide.findById(req.params.id);
    if (!heroSlide) {
      return res.status(404).json({ message: 'Hero slide not found' });
    }

    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hero slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;