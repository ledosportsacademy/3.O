const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  totalMembers: {
    type: Number,
    default: 0
  },
  totalActivities: {
    type: Number,
    default: 0
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  totalExpenses: {
    type: Number,
    default: 0
  },
  netBalance: {
    type: Number,
    default: 0
  },
  feesCollected: {
    type: Number,
    default: 0
  },
  pendingFees: {
    type: Number,
    default: 0
  },
  overdueFees: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dashboard', dashboardSchema);