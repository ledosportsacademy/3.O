const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Authentication middleware to protect routes
 * Verifies the JWT token from the request header
 */
const auth = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ledosportsacademysecret');
    
    // Find admin by id
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Token is valid but admin not found' });
    }
    
    // Add admin from payload
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;