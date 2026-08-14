require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const couponRoutes = require('./routes/couponRoutes');
const storeRoutes = require('./routes/storeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const statsRoutes = require('./routes/statsRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database (with fallback)
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    platform: 'Grab N Save — Coupon Aggregation Platform API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/coupons', couponRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/submissions', submissionRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Grab N Save Server listening on http://localhost:${PORT}`);
});
