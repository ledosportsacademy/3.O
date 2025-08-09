const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const logger = require('./utils/logger');

// Import routes
const heroSlideRoutes = require('./routes/heroSlideRoutes');
const activityRoutes = require('./routes/activityRoutes');
const memberRoutes = require('./routes/memberRoutes');
const donationRoutes = require('./routes/donationRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const weeklyFeeRoutes = require('./routes/weeklyFeeRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middleware/auth');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Middleware
app.use(cors(config.corsOptions));
app.use(express.json({ limit: config.maxFileSize }));
app.use(express.urlencoded({ extended: true, limit: config.maxFileSize }));

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
  });

// Configure mongoose
mongoose.set('strictQuery', true);

// Routes
app.use('/api/hero-slides', heroSlideRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/weekly-fees', weeklyFeeRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Ledo Sports Academy API is running');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${config.nodeEnv}`);
});