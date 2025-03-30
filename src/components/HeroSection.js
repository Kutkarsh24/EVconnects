import React, { useState } from 'react';
import { HiSearch, HiLocationMarker } from 'react-icons/hi';

const HeroSection = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  const handleLocationAccess = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch(`${latitude},${longitude}`);
          setLocation(`Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to access your location. Please check your browser settings.');
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background GIF with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-[3px]" 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/bg.gif)`,
          filter: 'brightness(0.9)'
        }}
      ></div>
      
      {/* Overlay to improve content readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm inline-block px-8 py-4 rounded-lg mb-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-800 mb-2">
            Find EV Charging Stations Near You
          </h1>
          <p className="text-xl font-medium text-emerald-700 mb-2">
            Reliable, fast, and accessible EV charging at your fingertips.
          </p>
          <p className="max-w-2xl mx-auto" 
             style={{ 
               fontFamily: 'Playfair Display, Garamond, serif', 
               fontSize: '1.3rem',
               color: '#065f46',
               letterSpacing: '0.3px',
               fontWeight: '500',
               fontStyle: 'italic'
             }}>
            "{' '}Locate convenient charging stations for your electric vehicle anywhere, anytime.{' '}"
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/90 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-emerald-300 rounded-full leading-5 bg-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-800 shadow-md"
                placeholder="Enter your location or ZIP code"
                aria-label="Search location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleLocationAccess}
                className="inline-flex items-center px-4 py-2 md:py-4 border border-emerald-300 rounded-full shadow-sm text-base font-medium text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                disabled={isLoading}
                aria-label="Use my current location"
              >
                <HiLocationMarker className="h-5 w-5 mr-2 text-emerald-600" aria-hidden="true" />
                {isLoading ? 'Loading...' : 'Use My Location'}
              </button>
              
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 md:py-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-emerald-800 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                disabled={isLoading}
              >
                Search
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-white bg-red-500/90 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;