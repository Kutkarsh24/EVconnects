// Basic Express server for EVconnects API
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server and Socket.io instance
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://evconnects.com' : 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', message: 'EVconnects API is running!' });
});

// API routes for charging stations
app.get('/api/stations', (req, res) => {
  // This would typically fetch from a database
  const mockStations = require('../src/mockData');
  res.json(mockStations);
});

// API endpoint for creating Stripe payment intents
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
    
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Socket.io connection events
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('join-station', (stationId) => {
    socket.join(`station:${stationId}`);
    console.log(`User ${socket.id} joined station ${stationId}`);
  });
  
  socket.on('leave-station', (stationId) => {
    socket.leave(`station:${stationId}`);
    console.log(`User ${socket.id} left station ${stationId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`EVconnects server running on port ${PORT}`);
});