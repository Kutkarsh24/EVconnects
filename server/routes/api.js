const express = require('express');
const router = express.Router();
const Station = require('../models/Station');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const config = require('../config');

// Get all stations
router.get('/stations', async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    console.error('Error fetching stations:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get station by ID
router.get('/stations/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.json(station);
  } catch (err) {
    console.error('Error fetching station by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get nearby stations
router.get('/stations/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    
    // Convert radius from km to meters
    const radiusInMeters = parseInt(radius) * 1000;
    
    const stations = await Station.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radiusInMeters
        }
      }
    });
    
    res.json(stations);
  } catch (err) {
    console.error('Error fetching nearby stations:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
    
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    res.status(500).json({ error: err.message });
  }
});

// Payment history (protected route example)
router.get('/payments/history', (req, res) => {
  // This would typically check user authentication
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Mock payment history
  res.json([
    {
      id: 'payment_1',
      amount: 15.75,
      date: new Date(),
      status: 'completed',
      station: 'Station Name'
    }
  ]);
});

module.exports = router;