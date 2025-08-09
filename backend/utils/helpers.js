/**
 * Helper functions for the Ledo Sports Academy API
 */

/**
 * Formats an error response
 * @param {Error} error - The error object
 * @param {string} defaultMessage - Default message if error doesn't have one
 * @returns {Object} Formatted error object
 */
const formatErrorResponse = (error, defaultMessage = 'Server error') => {
  console.error(error);
  return {
    message: error.message || defaultMessage,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  };
};

/**
 * Validates a URL string
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validates a date string (YYYY-MM-DD format)
 * @param {string} dateString - The date string to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Calculates the total amount from an array of objects with amount property
 * @param {Array} items - Array of objects with amount property
 * @returns {number} Total amount
 */
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.amount || 0), 0);
};

/**
 * Groups items by a specific property
 * @param {Array} items - Array of objects
 * @param {string} property - Property to group by
 * @returns {Object} Grouped items
 */
const groupBy = (items, property) => {
  return items.reduce((grouped, item) => {
    const key = item[property];
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
    return grouped;
  }, {});
};

/**
 * Formats a date to YYYY-MM-DD
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

module.exports = {
  formatErrorResponse,
  isValidUrl,
  isValidDate,
  calculateTotal,
  groupBy,
  formatDate
};