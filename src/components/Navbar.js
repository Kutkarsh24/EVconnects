import React, { useState } from 'react';
import { HiMenu, HiX, HiUserCircle, HiLogout, HiShoppingCart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import mainLogo from '../assets/Mainlogo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // No need for explicit navigation as the UI will update based on auth state
  };

  // Helper to get vehicle display text
  const getVehicleText = () => {
    if (!user || !user.vehicleInfo) return '';
    
    const { type, brand } = user.vehicleInfo;
    let vehicleType = type;
    
    if (type === 'car') vehicleType = '4 Wheeler';
    if (type === 'motorcycle') vehicleType = '2 Wheeler';
    
    return `${brand} ${vehicleType}`;
  };

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - Left aligned */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={mainLogo} 
                alt="EVConnects Logo" 
                className="h-10 w-auto mr-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = process.env.PUBLIC_URL + '/Mainlogo.png';
                }}
              />
              <span className="text-xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                EVConnects
              </span>
            </Link>
          </div>
          
          {/* Navigation Menu - Center aligned (hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium">Home</Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium bg-transparent"
              >
                About
              </button>
              <Link to="/services" className="px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium">Services</Link>
            </div>
          </div>
          
          {/* Right side icons - Cart and Login/User */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/services" 
              className="p-1 rounded-full text-emerald-600 hover:bg-emerald-100 focus:outline-none"
              aria-label="View services"
            >
              <HiShoppingCart className="h-7 w-7" />
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm text-gray-700 font-medium">
                    {user.firstName || 'User'}
                  </span>
                  {user.vehicleInfo && (
                    <span className="text-xs text-gray-500">
                      {getVehicleText()}
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <HiLogout className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <HiUserCircle className="mr-2 h-5 w-5" />
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-emerald-600">Home</Link>
            <button 
              onClick={() => {
                scrollToSection('about');
                setIsMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-emerald-600 bg-transparent"
            >
              About
            </button>
            <Link 
              to="/services" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            {user ? (
              <>
                <div className="block px-3 py-2 text-sm font-medium text-gray-700">
                  Welcome, {user.firstName || 'User'}
                </div>
                {user.vehicleInfo && (
                  <div className="block px-3 py-2 text-sm font-medium text-gray-500">
                    Vehicle: {getVehicleText()}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-emerald-600">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;