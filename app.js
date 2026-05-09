require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');

const connectDB = require('./config/db');
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
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// ----------------------------- DB Connection -----------------------------
connectDB();

// ----------------------------- CORS Configuration -----------------------------
const allowedOrigins = [
  'http://localhost:5173',               // Vite default
  'http://localhost:3000',               // React default
  process.env.FRONTEND_URL               // Your production frontend URL from env
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ----------------------------- Middleware -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------------------------- Logging -----------------------------
// Console logging for all environments
app.use(morgan('dev'));

// File logging only in development (Vercel's filesystem is read-only in production)
if (process.env.NODE_ENV !== 'production') {
  const logDirectory = path.join(__dirname, 'logs');
  // Ensure log directory exists
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
  });
  app.use(morgan('combined', { stream: accessLogStream }));
}

// ----------------------------- Static Files -----------------------------
// Note: For uploaded files, use Cloudinary (not local disk) in production.
// The following line serves local uploads only in development.
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

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

// ----------------------------- Root Route -----------------------------
app.get('/', (req, res) => {
  res.send('E-Commerce API is running...');
});

// ----------------------------- Error Handling -----------------------------
app.use(notFound);
app.use(errorHandler);

module.exports = app;
