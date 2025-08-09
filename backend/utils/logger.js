/**
 * Logger utility for consistent logging throughout the application
 */

const config = require('../config/config');

// Define log levels
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Determine current log level based on environment
const CURRENT_LOG_LEVEL = config.nodeEnv === 'production' 
  ? LOG_LEVELS.INFO 
  : LOG_LEVELS.DEBUG;

/**
 * Format log message with timestamp and level
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 * @returns {string} Formatted log message
 */
const formatLogMessage = (level, message, data) => {
  const timestamp = new Date().toISOString();
  let logMessage = `[${timestamp}] [${level}] ${message}`;
  
  if (data) {
    if (data instanceof Error) {
      logMessage += `\n${data.stack || data.message}`;
    } else if (typeof data === 'object') {
      try {
        logMessage += `\n${JSON.stringify(data, null, 2)}`;
      } catch (error) {
        logMessage += `\n[Object]`;
      }
    } else {
      logMessage += `\n${data}`;
    }
  }
  
  return logMessage;
};

/**
 * Log error message
 * @param {string} message - Error message
 * @param {Object} data - Additional data to log
 */
const error = (message, data) => {
  if (CURRENT_LOG_LEVEL >= LOG_LEVELS.ERROR) {
    console.error(formatLogMessage('ERROR', message, data));
  }
};

/**
 * Log warning message
 * @param {string} message - Warning message
 * @param {Object} data - Additional data to log
 */
const warn = (message, data) => {
  if (CURRENT_LOG_LEVEL >= LOG_LEVELS.WARN) {
    console.warn(formatLogMessage('WARN', message, data));
  }
};

/**
 * Log info message
 * @param {string} message - Info message
 * @param {Object} data - Additional data to log
 */
const info = (message, data) => {
  if (CURRENT_LOG_LEVEL >= LOG_LEVELS.INFO) {
    console.info(formatLogMessage('INFO', message, data));
  }
};

/**
 * Log debug message
 * @param {string} message - Debug message
 * @param {Object} data - Additional data to log
 */
const debug = (message, data) => {
  if (CURRENT_LOG_LEVEL >= LOG_LEVELS.DEBUG) {
    console.debug(formatLogMessage('DEBUG', message, data));
  }
};

module.exports = {
  error,
  warn,
  info,
  debug
};