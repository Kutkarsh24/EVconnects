# EVconnects

![EVconnects Logo](/public/Mainlogo.png)

## 🚀 Overview

EVconnects is a modern web application designed to facilitate electric vehicle charging station discovery, booking, and payment processing. The platform connects EV owners with charging stations, providing a seamless experience from finding a nearby station to completing the payment process.

## ✨ Features

- **Interactive Charging Station Map**: Find nearby charging stations with detailed information
- **User Authentication**: Secure login and account management
- **Vehicle Selection**: Register and manage your electric vehicles
- **Real-time Availability**: Check station availability in real-time
- **Seamless Booking**: Reserve charging slots at your preferred time
- **Stripe Payment Integration**: Secure and convenient payment processing
- **Email Notifications**: Get updates on your bookings and transactions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **React**: Front-end library for building the user interface
- **React Router**: Navigation and routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Stripe**: Payment processing integration
- **EmailJS**: Email notification service
- **React Icons**: Icon library

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Stripe account for payment processing
- EmailJS account for email notifications

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kutkarsh24/EVconnects.git
   cd EVconnects/evconnect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your environment variables:
   ```
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   REACT_APP_EMAILJS_USER_ID=your_emailjs_user_id
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 🚀 Usage

1. Register an account or login
2. Add your vehicle details
3. Browse available charging stations
4. Select a station and book a charging slot
5. Complete payment using the Stripe integration
6. Receive email confirmation

## 📱 Screenshots

*(Add screenshots of your application here)*

## 🔒 Environment Variables

Make sure to set up the following environment variables:

- `REACT_APP_STRIPE_PUBLIC_KEY`: Your Stripe public API key
- `REACT_APP_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `REACT_APP_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
- `REACT_APP_EMAILJS_USER_ID`: Your EmailJS user ID

## 📚 Project Structure

```
evconnect/
├── public/             # Static files
├── src/                # Source code
│   ├── assets/         # Images and resources
│   ├── components/     # Reusable components
│   ├── context/        # React context
│   ├── pages/          # Page components
│   └── services/       # Service integrations
├── .env                # Environment variables (create this)
└── package.json        # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT](LICENSE)

## 📬 Contact

Kumar Utkarsh - [kutkars24@gmail.com](mailto:kutkars24@gmail.com)

Project Link: [https://github.com/Kutkarsh24/EVconnects](https://github.com/Kutkarsh24/EVconnects)
