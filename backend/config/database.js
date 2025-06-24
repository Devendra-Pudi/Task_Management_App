const mongoose = require('mongoose');

const connectDB = async () => {
  const maxRetries = 3;
  let retryCount = 0;

  const connect = async () => {
    try {
      if (!process.env.MONGODB_URL) {
        throw new Error('MongoDB connection string is not provided in environment variables');
      }

      await mongoose.connect(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        w: 'majority'
      });
      console.log('✅ MongoDB connected successfully!');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      retryCount++;
      
      if (retryCount < maxRetries) {
        console.log(`Retrying connection... Attempt ${retryCount} of ${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
        return connect();
      } else {
        console.error('Failed to connect to MongoDB after maximum retries');
        throw error; // Propagate the error up
      }
    }
  };

  // Handle connection events
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    if (process.env.NODE_ENV === 'production') {
      connect().catch(err => {
        console.error('Failed to reconnect after disconnect:', err);
      });
    }
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    if (process.env.NODE_ENV === 'production') {
      connect().catch(err => {
        console.error('Failed to reconnect after error:', err);
      });
    }
  });

  // Initial connection
  await connect();
};

module.exports = connectDB;
