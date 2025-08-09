/**
 * Script to create an initial admin user
 * Run with: node scripts/createAdmin.js
 */

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

// Import Admin model
const Admin = require('../models/Admin');

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    createAdmin();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Default admin credentials
const defaultAdmin = {
  username: 'admin',
  password: 'LedoSports2023!'
};

// Create admin function
async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: defaultAdmin.username });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultAdmin.password, salt);
    
    // Create new admin
    const admin = new Admin({
      username: defaultAdmin.username,
      password: hashedPassword
    });
    
    await admin.save();
    
    console.log('Admin user created successfully');
    console.log('Username:', defaultAdmin.username);
    console.log('Password:', defaultAdmin.password);
    console.log('IMPORTANT: Please change this password after first login');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}