/**
 * Request validation middleware
 */

const { isValidUrl, isValidDate } = require('../utils/helpers');

/**
 * Validate hero slide data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateHeroSlide = (req, res, next) => {
  const { title, backgroundImage } = req.body;
  
  // Check required fields
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  if (!backgroundImage) {
    return res.status(400).json({ message: 'Background image URL is required' });
  }
  
  // Validate URL
  if (!isValidUrl(backgroundImage)) {
    return res.status(400).json({ message: 'Please enter a valid background image URL' });
  }
  
  // If CTA link is provided, validate it
  if (req.body.ctaLink && !isValidUrl(req.body.ctaLink)) {
    return res.status(400).json({ message: 'Please enter a valid CTA link URL' });
  }
  
  // If redirect URL is provided, validate it
  if (req.body.redirectUrl && !isValidUrl(req.body.redirectUrl)) {
    return res.status(400).json({ message: 'Please enter a valid redirect URL' });
  }
  
  next();
};

/**
 * Validate activity data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateActivity = (req, res, next) => {
  const { title, date, status } = req.body;
  
  // Check required fields
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }
  
  // Validate date
  if (!isValidDate(date)) {
    return res.status(400).json({ message: 'Please enter a valid date in YYYY-MM-DD format' });
  }
  
  // Validate status if provided
  if (status && !['upcoming', 'recent', 'active'].includes(status)) {
    return res.status(400).json({ message: 'Status must be one of: upcoming, recent, active' });
  }
  
  // If image URL is provided, validate it
  if (req.body.image && !isValidUrl(req.body.image)) {
    return res.status(400).json({ message: 'Please enter a valid image URL' });
  }
  
  // If redirect URL is provided, validate it
  if (req.body.redirectUrl && !isValidUrl(req.body.redirectUrl)) {
    return res.status(400).json({ message: 'Please enter a valid redirect URL' });
  }
  
  next();
};

/**
 * Validate member data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateMember = (req, res, next) => {
  const { name, contact, phone, joinDate } = req.body;
  
  // Check required fields
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  
  if (!contact) {
    return res.status(400).json({ message: 'Contact email is required' });
  }
  
  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }
  
  if (!joinDate) {
    return res.status(400).json({ message: 'Join date is required' });
  }
  
  // Validate date
  if (!isValidDate(joinDate)) {
    return res.status(400).json({ message: 'Please enter a valid join date in YYYY-MM-DD format' });
  }
  
  // If image URL is provided, validate it
  if (req.body.image && !isValidUrl(req.body.image)) {
    return res.status(400).json({ message: 'Please enter a valid image URL' });
  }
  
  next();
};

/**
 * Validate donation data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateDonation = (req, res, next) => {
  const { donorName, amount, date } = req.body;
  
  // Check required fields
  if (!donorName) {
    return res.status(400).json({ message: 'Donor name is required' });
  }
  
  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }
  
  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }
  
  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }
  
  // Validate date
  if (!isValidDate(date)) {
    return res.status(400).json({ message: 'Please enter a valid date in YYYY-MM-DD format' });
  }
  
  next();
};

/**
 * Validate expense data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateExpense = (req, res, next) => {
  const { description, amount, date, category } = req.body;
  
  // Check required fields
  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }
  
  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }
  
  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }
  
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }
  
  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }
  
  // Validate date
  if (!isValidDate(date)) {
    return res.status(400).json({ message: 'Please enter a valid date in YYYY-MM-DD format' });
  }
  
  // Validate category
  const validCategories = ['Equipment', 'Maintenance', 'Rent', 'Utilities', 'Salaries', 'Transportation', 'Marketing', 'Events', 'Other'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: `Category must be one of: ${validCategories.join(', ')}` });
  }
  
  next();
};

/**
 * Validate experience data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateExperience = (req, res, next) => {
  const { title, date, description } = req.body;
  
  // Check required fields
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }
  
  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }
  
  // Validate date
  if (!isValidDate(date)) {
    return res.status(400).json({ message: 'Please enter a valid date in YYYY-MM-DD format' });
  }
  
  // If image URL is provided, validate it
  if (req.body.image && !isValidUrl(req.body.image)) {
    return res.status(400).json({ message: 'Please enter a valid image URL' });
  }
  
  next();
};

/**
 * Validate gallery item data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateGalleryItem = (req, res, next) => {
  const { title, url } = req.body;
  
  // Check required fields
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  if (!url) {
    return res.status(400).json({ message: 'Image URL is required' });
  }
  
  // Validate URL
  if (!isValidUrl(url)) {
    return res.status(400).json({ message: 'Please enter a valid image URL' });
  }
  
  next();
};

/**
 * Validate weekly fee payment data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateWeeklyFeePayment = (req, res, next) => {
  const { memberId, date, amount, status } = req.body;
  
  // Check required fields
  if (!memberId) {
    return res.status(400).json({ message: 'Member ID is required' });
  }
  
  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }
  
  // Validate date
  if (!isValidDate(date)) {
    return res.status(400).json({ message: 'Please enter a valid date in YYYY-MM-DD format' });
  }
  
  // Validate amount if provided
  if (amount !== undefined && (isNaN(amount) || amount < 0)) {
    return res.status(400).json({ message: 'Amount must be a non-negative number' });
  }
  
  // Validate status if provided
  if (status && !['pending', 'paid', 'overdue'].includes(status)) {
    return res.status(400).json({ message: 'Status must be one of: pending, paid, overdue' });
  }
  
  next();
};

module.exports = {
  validateHeroSlide,
  validateActivity,
  validateMember,
  validateDonation,
  validateExpense,
  validateExperience,
  validateGalleryItem,
  validateWeeklyFeePayment
};