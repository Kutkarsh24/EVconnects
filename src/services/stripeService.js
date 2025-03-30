// Stripe payment service for handling payment processing
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
// In a production app, this should be stored in environment variables
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51O3SoeSlwgpntjA9MsE1aDGR3NvgPQrK4tOZWlWDWRRefgtXlmBDN8Nm4F4mq5AHwv6qPYapYdLaRcSk8ygfYDXE00ChrGQJ3g';

// Initialize Stripe
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Function to create a payment intent (normally would be done server-side)
// In a real application, this would make an API call to your backend
export const createPaymentIntent = async (amount, currency = 'inr') => {
  try {
    // In a real app, this would be a fetch call to your backend
    // For demo purposes, we're simulating a successful response
    return {
      clientSecret: 'mock_client_secret_' + Math.random().toString(36).substring(2, 15),
      amount: amount,
      currency: currency
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Calculate pricing based on charger type and time
export const calculatePrice = (chargerType, hours = 1) => {
  let baseRate;
  
  switch(chargerType) {
    case 'CCS':
      baseRate = 120;
      break;
    case 'CHAdeMO':
      baseRate = 150;
      break;
    case 'Type 2 AC':
      baseRate = 80;
      break;
    default:
      baseRate = 100;
  }
  
  return baseRate * hours;
};