/**
 * Global error handling middleware
 */

const { formatErrorResponse } = require('../utils/helpers');

/**
 * Error handling middleware
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Check if headers already sent
  if (res.headersSent) {
    return next(err);
  }
  
  // Format error response
  const errorResponse = formatErrorResponse(err);
  
  // Determine status code
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  // Send error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Not found middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };