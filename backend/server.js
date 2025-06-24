// This is like the main switch that turns on your app!
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const feedbackRoutes = require('./routes/feedback');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Trust proxy - required for rate limiting behind reverse proxies (like Render.com)
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGO_URI;

if (!MONGODB_URL) {
  console.error('❌ No MongoDB connection string provided in environment variables!');
  process.exit(1);
}

// Start uptime robot in production
if (process.env.NODE_ENV === 'production') {
  require('./uptimerobot');
}

// CORS Configuration
const ALLOWED_ORIGIN = 'https://fantastic-centaur-20d040.netlify.app';

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// Simple CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Log the incoming request details
  console.log('Request details:', {
    method: req.method,
    url: req.url,
    origin: origin,
    allowedOrigin: ALLOWED_ORIGIN,
    ip: req.ip,
    'x-forwarded-for': req.headers['x-forwarded-for']
  });

  if (origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.'
    });
  }
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    cors: {
      allowedOrigin: ALLOWED_ORIGIN
    },
    proxy: {
      trusted: app.get('trust proxy'),
      ip: req.ip,
      'x-forwarded-for': req.headers['x-forwarded-for']
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`🔒 CORS configured for origin: ${ALLOWED_ORIGIN}`);
      console.log('👥 Trust proxy enabled:', app.get('trust proxy'));
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received. Closing HTTP server...');
      server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('❌ Unhandled Promise Rejection:', err);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });

// Root route
app.get('/', (req, res) => {
  res.send('Hello! Your task app backend is working! 🎉');
});
