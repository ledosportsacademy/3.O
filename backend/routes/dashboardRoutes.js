const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Activity = require('../models/Activity');
const Donation = require('../models/Donation');
const Expense = require('../models/Expense');
const WeeklyFee = require('../models/WeeklyFee');
const Dashboard = require('../models/Dashboard');

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Get counts
    const totalMembers = await Member.countDocuments();
    const totalActivities = await Activity.countDocuments();
    
    // Get financial data
    const donationsResult = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalDonations = donationsResult.length > 0 ? donationsResult[0].total : 0;
    
    const expensesResult = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalExpenses = expensesResult.length > 0 ? expensesResult[0].total : 0;
    
    const netBalance = totalDonations - totalExpenses;
    
    // Get weekly fees data
    const weeklyFees = await WeeklyFee.find();
    let feesCollected = 0;
    let pendingFees = 0;
    let overdueFees = 0;
    
    weeklyFees.forEach(fee => {
      fee.payments.forEach(payment => {
        if (payment.status === 'paid') {
          feesCollected += payment.amount;
        } else if (payment.status === 'pending') {
          pendingFees += payment.amount;
        } else if (payment.status === 'overdue') {
          overdueFees += payment.amount;
        }
      });
    });
    
    // Create or update dashboard stats
    let dashboard = await Dashboard.findOne();
    if (!dashboard) {
      dashboard = new Dashboard();
    }
    
    dashboard.totalMembers = totalMembers;
    dashboard.totalActivities = totalActivities;
    dashboard.totalDonations = totalDonations;
    dashboard.totalExpenses = totalExpenses;
    dashboard.netBalance = netBalance;
    dashboard.feesCollected = feesCollected;
    dashboard.pendingFees = pendingFees;
    dashboard.overdueFees = overdueFees;
    dashboard.lastUpdated = new Date();
    
    await dashboard.save();
    
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get expense categories for chart
router.get('/expense-categories', async (req, res) => {
  try {
    const expensesByCategory = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);
    
    const categories = expensesByCategory.map(item => ({
      category: item._id,
      amount: item.total
    }));
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get financial data for chart
router.get('/financial-chart', async (req, res) => {
  try {
    // Get donations by month
    const donationsByMonth = await Donation.aggregate([
      {
        $group: {
          _id: { $substr: ['$date', 0, 7] }, // Group by YYYY-MM
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Get expenses by month
    const expensesByMonth = await Expense.aggregate([
      {
        $group: {
          _id: { $substr: ['$date', 0, 7] }, // Group by YYYY-MM
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Format data for chart
    const months = new Set();
    donationsByMonth.forEach(item => months.add(item._id));
    expensesByMonth.forEach(item => months.add(item._id));
    
    const sortedMonths = Array.from(months).sort();
    
    const chartData = {
      labels: sortedMonths.map(month => {
        const [year, monthNum] = month.split('-');
        return `${monthNum}/${year.substring(2)}`;
      }),
      donations: sortedMonths.map(month => {
        const found = donationsByMonth.find(item => item._id === month);
        return found ? found.total : 0;
      }),
      expenses: sortedMonths.map(month => {
        const found = expensesByMonth.find(item => item._id === month);
        return found ? found.total : 0;
      })
    };
    
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recent activities for dashboard
router.get('/recent-activities', async (req, res) => {
  try {
    const recentActivities = await Activity.find()
      .sort({ date: -1 })
      .limit(5);
    
    res.json(recentActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;