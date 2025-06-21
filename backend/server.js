// This is like the main switch that turns on your app!
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const feedbackRoutes = require('./routes/feedback');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pudidevendraprasad:YEUepp1gHEsUlCdW@clustertask.njxorpt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTask';

// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(express.json());


app.use(cors({
  origin: "https://task-management-app-omega-tawny.vercel.app", // exact Vercel frontend URL
  credentials: true
}));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/feedback', feedbackRoutes);

// Connect to MongoDB with proper error handling
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });


// A simple test route
app.get('/', (req, res) => {
  res.send('Hello! Your task app backend is working! 🎉');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
