const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  backgroundImage: {
    type: String,
    required: true,
    trim: true
  },
  ctaText: {
    type: String,
    required: true,
    trim: true
  },
  ctaLink: {
    type: String,
    trim: true,
    default: '#'
  },
  redirectUrl: {
    type: String,
    trim: true
  },
  openNewTab: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HeroSlide', heroSlideSchema);