require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Health check endpoint (sẽ dùng ở bước 9)
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';
  res.status(200).json({ status: 'OK', database: dbState });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - v2`);
});