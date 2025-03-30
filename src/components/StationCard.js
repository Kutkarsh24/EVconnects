import React, { useState } from 'react';
import { HiLocationMarker, HiCheck, HiX, HiClock, HiCurrencyRupee } from 'react-icons/hi';
import { HiLightningBolt, HiCalendar, HiXCircle, HiPhone, HiCreditCard } from 'react-icons/hi';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise, calculatePrice } from '../services/stripeService';
import PaymentForm from './PaymentForm';

const StationCard = ({ station }) => {
  const { name, address, distance, isAvailable, chargerTypes } = station;
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedChargerType, setSelectedChargerType] = useState(chargerTypes[0]);
  const [bookingHours, setBookingHours] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState({
    success: false,
    error: null,
    processing: false
  });

  // Generate pricing for each charger type (in rupees/hr)
  const getPricing = (chargerType) => {
    switch(chargerType) {
      case 'CCS':
        return '₹120/hr';
      case 'CHAdeMO':
        return '₹150/hr';
      case 'Type 2 AC':
        return '₹80/hr';
      default:
        return '₹100/hr';
    }
  };

  // Additional station details for the modal
  const stationDetails = {
    openingHours: '24 hours',
    contactNumber: '+91 ' + Math.floor(7000000000 + Math.random() * 999999999),
    amenities: ['Restrooms', 'Cafe', 'Wi-Fi', 'Parking'],
    paymentMethods: ['Credit Card', 'Debit Card', 'UPI', 'Cash']
  };

  const handlePayment = () => {
    setShowModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus({
      success: true,
      error: null,
      processing: false
    });
    
    setTimeout(() => {
      setShowPaymentModal(false);
      alert('Payment successful! Your slot has been booked.');
    }, 1500);
  };

  const handlePaymentError = (errorMessage) => {
    setPaymentStatus({
      success: false,
      error: errorMessage || 'Payment failed. Please try again.',
      processing: false
    });
  };

  // Calculate total price
  const totalPrice = calculatePrice(selectedChargerType, bookingHours);

  return (
    <>
      <div className="bg-dark-card rounded-lg shadow-dark-lg border border-dark-border hover:shadow-dark-sm transition-shadow duration-300 overflow-hidden">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-dark-text">{name}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isAvailable ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700' : 'bg-red-900/50 text-red-300 border border-red-700'
            }`}>
              {isAvailable ? (
                <>
                  <HiCheck className="mr-1" /> Available
                </>
              ) : (
                <>
                  <HiX className="mr-1" /> Occupied
                </>
              )}
            </span>
          </div>
          
          <div className="mt-2 flex items-start text-dark-text-muted">
            <HiLocationMarker className="mt-0.5 mr-1 flex-shrink-0 h-4 w-4 text-emerald-500" />
            <span className="text-sm">{address}</span>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center text-sm text-dark-text-muted">
              <span className="font-medium">Distance:</span>
              <span className="ml-1">{distance} miles</span>
            </div>
            
            <div className="mt-2">
              <span className="text-sm font-medium text-dark-text-muted">Charger Types:</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {chargerTypes.map((type, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-900/50 text-emerald-300 border border-emerald-800"
                  >
                    <HiLightningBolt className="mr-1" />
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-dark-sm text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              aria-label={`Book now at ${name}`}
            >
              <HiCalendar className="mr-2 h-5 w-5" />
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
              aria-hidden="true"
              onClick={() => setShowModal(false)}
            ></div>
            
            {/* Modal content */}
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-dark-card rounded-lg shadow-dark-lg sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-dark-border">
              <div className="relative px-4 pt-5 pb-4 sm:p-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-dark-text-muted hover:text-emerald-400 focus:outline-none"
                >
                  <HiXCircle className="w-6 h-6" />
                </button>
                
                <div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-2xl font-bold leading-6 text-emerald-400 mb-6">
                      {name}
                    </h3>
                    
                    <div className="mt-2 text-dark-text">
                      <div className="flex items-start mb-4">
                        <HiLocationMarker className="mt-0.5 mr-3 flex-shrink-0 h-5 w-5 text-emerald-500" />
                        <span>{address}</span>
                      </div>
                      
                      <div className="flex items-start mb-4">
                        <HiClock className="mt-0.5 mr-3 flex-shrink-0 h-5 w-5 text-emerald-500" />
                        <span>Hours: {stationDetails.openingHours}</span>
                      </div>
                      
                      <div className="flex items-start mb-4">
                        <HiPhone className="mt-0.5 mr-3 flex-shrink-0 h-5 w-5 text-emerald-500" />
                        <span>Contact: {stationDetails.contactNumber}</span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-emerald-400 mb-2">Pricing</h4>
                        <div className="bg-dark-secondary p-3 rounded-md">
                          <table className="w-full text-dark-text">
                            <thead>
                              <tr className="border-b border-dark-border">
                                <th className="py-2 text-left">Charger Type</th>
                                <th className="py-2 text-right">Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {chargerTypes.map((type, index) => (
                                <tr key={index} className="border-b border-dark-border">
                                  <td className="py-2 flex items-center">
                                    <HiLightningBolt className="mr-2 text-emerald-500" />
                                    {type}
                                  </td>
                                  <td className="py-2 text-right flex items-center justify-end">
                                    <HiCurrencyRupee className="text-emerald-500 mr-1" />
                                    {getPricing(type)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-emerald-400 mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {stationDetails.amenities.map((amenity, index) => (
                            <span key={index} className="px-3 py-1 text-sm bg-dark-accent text-dark-text rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-emerald-400 mb-2">Payment Methods</h4>
                        <div className="flex flex-wrap gap-2">
                          {stationDetails.paymentMethods.map((method, index) => (
                            <span key={index} className="px-3 py-1 text-sm flex items-center bg-dark-accent text-dark-text rounded-full">
                              <HiCreditCard className="mr-1 text-emerald-500" />
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 flex gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-dark-text bg-dark-accent border border-dark-border rounded-md hover:bg-dark-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-700 border border-transparent rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={handlePayment}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
              aria-hidden="true"
              onClick={() => !paymentStatus.processing && setShowPaymentModal(false)}
            ></div>
            
            {/* Modal content */}
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-dark-card rounded-lg shadow-dark-lg sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-dark-border">
              <div className="relative px-4 pt-5 pb-4 sm:p-6">
                <button
                  onClick={() => !paymentStatus.processing && setShowPaymentModal(false)}
                  className="absolute top-3 right-3 text-dark-text-muted hover:text-emerald-400 focus:outline-none"
                  disabled={paymentStatus.processing}
                >
                  <HiXCircle className="w-6 h-6" />
                </button>
                
                <div>
                  <h3 className="text-2xl font-bold leading-6 text-emerald-400 mb-6">
                    Payment for {name}
                  </h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-dark-text-muted mb-2">
                      <span>Charger Type:</span>
                      <span>{selectedChargerType}</span>
                    </div>
                    
                    <div className="flex justify-between text-dark-text-muted mb-2">
                      <span>Duration:</span>
                      <span>{bookingHours} hour{bookingHours > 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="flex justify-between text-dark-text mb-2 text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-emerald-400 mb-2">
                      Enter Card Details
                    </h4>
                  </div>
                  
                  {paymentStatus.success ? (
                    <div className="bg-emerald-900/50 text-emerald-300 p-4 rounded-md border border-emerald-700">
                      <div className="flex items-center">
                        <HiCheck className="h-6 w-6 mr-2" />
                        <span>Payment successful! Processing your booking...</span>
                      </div>
                    </div>
                  ) : (
                    <Elements stripe={stripePromise}>
                      <PaymentForm 
                        amount={totalPrice}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentError={handlePaymentError}
                        onCancel={() => setShowPaymentModal(false)}
                      />
                    </Elements>
                  )}
                  
                  {paymentStatus.error && (
                    <div className="mt-4 bg-red-900/50 text-red-300 p-3 rounded-md border border-red-700">
                      <div className="flex items-center">
                        <HiX className="h-5 w-5 mr-2" />
                        <span>{paymentStatus.error}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StationCard;