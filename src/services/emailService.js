// Email service that supports both mock emails and real emails via EmailJS
import emailjs from '@emailjs/browser';

// Configuration for EmailJS - in a real app, these would be in environment variables
const EMAILJS_SERVICE_ID = 'service_evconnect'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_welcome'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key';   // Replace with your EmailJS public key

// Feature flag to determine whether to use mock or real email service
const USE_REAL_EMAIL = false; // Set to true to use EmailJS

/**
 * Sends a welcome email to the user
 * @param {Object} user - User object containing email and name
 * @returns {Promise} - Promise that resolves when the email is sent
 */
export const sendWelcomeEmail = async (user) => {
  // Validate input
  if (!user || !user.email || !user.firstName) {
    console.error('Failed to send email: Invalid user data', user);
    return Promise.reject(new Error('Invalid user data. Email and firstName are required.'));
  }

  console.log(`Attempting to send welcome email to ${user.email}...`);
  
  // If using real emails, try EmailJS
  if (USE_REAL_EMAIL) {
    try {
      const templateParams = {
        to_name: user.firstName,
        to_email: user.email,
        from_name: 'EVConnect Team',
        message: `Welcome to EVConnect! We're excited to help you find charging stations for your electric vehicle.`,
      };
      
      console.log('Sending real email via EmailJS');
      
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('SUCCESS!', response.status, response.text);
      
      return {
        success: true,
        message: `Welcome email sent to ${user.email}`
      };
    } catch (error) {
      console.error('FAILED TO SEND EMAIL...', error);
      throw new Error('Failed to send email via EmailJS');
    }
  }
  
  // Mock email sending - simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // In a real application, this would call a backend API
        console.log(`Welcome email successfully sent to ${user.email}`);
        
        // Log the email content for demonstration
        console.log({
          to: user.email,
          subject: `Welcome to EVConnect, ${user.firstName}!`,
          body: `
            <h2>Welcome to EVConnect, ${user.firstName}!</h2>
            <p>Thank you for joining our community. We're excited to help you find charging stations for your electric vehicle.</p>
            <p>With EVConnect, you can:</p>
            <ul>
              <li>Find charging stations near you</li>
              <li>Get real-time availability updates</li>
              <li>Plan your routes with charging stops</li>
            </ul>
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Happy charging!</p>
            <p>The EVConnect Team</p>
          `
        });
        
        // Mock successful API response
        resolve({ 
          success: true,
          message: `Welcome email sent to ${user.email}`,
          isMock: true
        });
      } catch (error) {
        console.error('Error sending welcome email:', error);
        reject(new Error('Failed to send welcome email. Please try again later.'));
      }
    }, 1500);
  });
};