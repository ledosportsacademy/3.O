const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
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
    trim: true,
    default: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);