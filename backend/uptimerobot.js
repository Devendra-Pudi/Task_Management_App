const axios = require('axios');

// Get the backend URL from environment variables
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// Ping the health endpoint every 14 minutes
const pingInterval = 14 * 60 * 1000; // 14 minutes in milliseconds

console.log('Starting uptime robot...');

// Initial ping
pingServer();

// Set up regular pinging
setInterval(pingServer, pingInterval);

async function pingServer() {
  try {
    const response = await axios.get(`${BACKEND_URL}/health`);
    console.log(`[${new Date().toISOString()}] Server is alive:`, response.data.status);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error pinging server:`, error.message);
  }
} 