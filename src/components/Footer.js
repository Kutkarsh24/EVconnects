import React from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-xl font-bold text-emerald-400 mb-4">EVConnect</h2>
            <p className="text-gray-400 mb-4">
              Your trusted partner for all your electric vehicle charging needs. 
              Making sustainable transportation accessible for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-emerald-400">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-emerald-400">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-emerald-400">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-emerald-400">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-emerald-400">Home</a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-emerald-400">Services</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-emerald-400">About Us</a>
              </li>
              <li>
                <a href="/stations" className="text-gray-400 hover:text-emerald-400">Charging Stations</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-emerald-400">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-emerald-400">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <HiMail className="h-6 w-6 text-emerald-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-400">General Inquiries:</p>
                  <a href="mailto:info@evconnect.com" className="text-gray-300 hover:text-emerald-400">info@evconnect.com</a><br/>
                  <a href="mailto:kutkarsh24@gmail.com" className="text-gray-300 hover:text-emerald-400">kutkarsh24@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <HiPhone className="h-6 w-6 text-emerald-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-400">Support:</p>
                  <a href="tel:+1-800-EV-CHARG" className="text-gray-300 hover:text-emerald-400">+1-800-EV-CHARG</a>
                </div>
              </li>
              <li className="flex items-start">
                <HiLocationMarker className="h-6 w-6 text-emerald-400 mr-2 mt-0.5" />
                <div className="text-gray-400">
                  EVConnect Headquarters<br/>
                  123 Electric Avenue<br/>
                  Green City, EC 98765
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} EVConnect. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Helping EV drivers find charging stations since 2023
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;