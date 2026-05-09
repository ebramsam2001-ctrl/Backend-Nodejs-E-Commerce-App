require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Use the safe version
const connectDB = require('./config/db-vercel'); // or rename the original

connectDB().catch(err => {
  console.error('DB connection failed:', err.message);
});

app.get('/api/test-db', async (req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ 
    readyState: state, 
    status: ['disconnected', 'connected', 'connecting', 'disconnecting'][state],
    envSet: !!process.env.MONGO_URL
  });
});

module.exports = app;
