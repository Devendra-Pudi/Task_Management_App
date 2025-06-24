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
const ALLOWED_ORIGINS = [
  'https://fantastic-centaur-20d040.netlify.app',
  'http://localhost:5173', // Vite's default development port
  'http://localhost:3000'  // Alternative development port
];

// Basic middleware
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid JSON payload',
        error: process.env.NODE_ENV === 'development' ? e.message : undefined
      });
      throw new Error('Invalid JSON');
    }
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// Request logging middleware
app.use((req, res, next) => {
  const requestStart = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  // Log request details
  console.log(`📥 [${requestId}] Incoming ${req.method} request to ${req.url}`);
  console.log({
    id: requestId,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    allowedOrigin: ALLOWED_ORIGINS,
    ip: req.ip,
    'x-forwarded-for': req.headers['x-forwarded-for'],
    'content-type': req.headers['content-type'],
    body: req.method !== 'GET' ? req.body : undefined
  });

  // Log response on finish
  res.on('finish', () => {
    const duration = Date.now() - requestStart;
    console.log(`📤 [${requestId}] Response sent:`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      headers: res.getHeaders()
    });
  });

  next();
});

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  }

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
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log('⚠️ Rate limit exceeded:', {
      ip: req.ip,
      'x-forwarded-for': req.headers['x-forwarded-for']
    });
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.'
    });
  }
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// API routes with error handling
app.use('/api/auth', (req, res, next) => {
  try {
    authRoutes(req, res, next);
  } catch (error) {
    console.error('❌ Auth route error:', error);
    next(error);
  }
});

app.use('/api/tasks', (req, res, next) => {
  try {
    taskRoutes(req, res, next);
  } catch (error) {
    console.error('❌ Tasks route error:', error);
    next(error);
  }
});

app.use('/api/feedback', (req, res, next) => {
  try {
    feedbackRoutes(req, res, next);
  } catch (error) {
    console.error('❌ Feedback route error:', error);
    next(error);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    cors: {
      allowedOrigin: ALLOWED_ORIGINS
    },
    proxy: {
      trusted: app.get('trust proxy'),
      ip: req.ip,
      'x-forwarded-for': req.headers['x-forwarded-for']
    },
    memory: process.memoryUsage()
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', {
    error: err,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    headers: req.headers
  });

  // Handle specific types of errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate key error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`🔒 CORS configured for origin: ${ALLOWED_ORIGINS}`);
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
