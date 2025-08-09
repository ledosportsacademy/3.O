/**
 * Configuration settings for the Ledo Sports Academy API
 */

require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // MongoDB configuration
  mongoURI: process.env.MONGODB_URI,
  
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'ledosportsacademysecret',
  jwtExpiration: '1d',
  
  // CORS configuration
  corsOptions: {
    origin: '*', // In production, this should be restricted to specific domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
  },
  
  // Pagination defaults
  defaultPageSize: 10,
  maxPageSize: 100,
  
  // File upload limits
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
  
  // Weekly fee default amount
  defaultWeeklyFeeAmount: 20
};