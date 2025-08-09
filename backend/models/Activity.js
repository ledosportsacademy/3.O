const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'recent', 'active'],
    default: 'upcoming'
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

module.exports = mongoose.model('Activity', activitySchema);