require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to DB (but don't crash on error)
const connectDB = require('./config/db');
connectDB().catch(err => console.error('DB connection error:', err));

app.get('/api/test-db', async (req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ state });
});

module.exports = app;
