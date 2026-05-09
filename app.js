require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Import route modules
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const couponRoutes = require('./routes/couponRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Error middleware
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// ----------------------------- MongoDB Connection -----------------------------
// Connect without blocking the function startup; Vercel will keep the promise
const connectDB = require('./config/db');
connectDB().catch(err => {
  console.error('❌ MongoDB initial connection failed:', err.message);
  // Do not throw – let the function try again on next invocation
});

// ----------------------------- CORS Configuration -----------------------------
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

// ----------------------------- Standard Middleware -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------------------------- Logging (console only, safe for serverless) -----------------------------
app.use(morgan('dev')); // Logs to console – Vercel captures these logs

// ----------------------------- Routes -----------------------------
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/upload', uploadRoutes);

// ----------------------------- Database Test Route -----------------------------
app.get('/api/test-db', async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    const stateString = ['disconnected', 'connected', 'connecting', 'disconnecting'][state];
    if (state === 1) {
      // Optional: count a document to verify read ability
      const User = require('./models/User');
      const userCount = await User.countDocuments().catch(() => 'unavailable');
      res.json({
        success: true,
        message: 'Database connected',
        state: stateString,
        userCount: userCount
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Database not ready',
        state: stateString
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message
    });
  }
});

// ----------------------------- Root Route -----------------------------
app.get('/', (req, res) => {
  res.send('E-Commerce API is running on Vercel');
});

// ----------------------------- Error Handling -----------------------------
app.use(notFound);
app.use(errorHandler);

module.exports = app;
