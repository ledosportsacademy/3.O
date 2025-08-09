const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return v.startsWith('http://') || v.startsWith('https://');
      },
      message: props => `${props.value} is not a valid URL. URL must start with http:// or https://`
    }
  },
  album: {
    type: String,
    trim: true,
    default: ''
  },
  isTopFive: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);