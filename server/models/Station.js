const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'USA'
    }
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  chargers: [{
    type: {
      type: String,
      required: true,
      enum: ['Level 1', 'Level 2', 'DC Fast Charging', 'Tesla Supercharger']
    },
    power: {
      type: Number, // kW
      required: true
    },
    connector: {
      type: String,
      required: true,
      enum: ['J1772', 'CCS', 'CHAdeMO', 'Tesla', 'NACS']
    },
    available: {
      type: Boolean,
      default: true
    }
  }],
  amenities: [{
    type: String,
    enum: ['Restrooms', 'Restaurant', 'Wifi', 'Shopping', 'Grocery']
  }],
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  pricing: {
    currency: {
      type: String,
      default: 'USD'
    },
    perKWh: {
      type: Number,
      required: true
    },
    minimumFee: Number
  },
  photos: [String],
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

// Index for geolocation queries
StationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Station', StationSchema);