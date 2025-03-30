import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronRight, HiOutlineTruck, HiOutlineCube } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

// Vehicle types and brands data
const vehicleTypes = [
  { id: 'car', name: '4 Wheeler (Car/SUV)', icon: 'car' },
  { id: 'motorcycle', name: '2 Wheeler (Motorcycle/Scooter)', icon: 'bike' },
  { id: 'truck', name: 'Truck', icon: 'truck' },
  { id: 'bus', name: 'Bus', icon: 'bus' },
  { id: 'van', name: 'Van', icon: 'van' }
];

const vehicleBrands = {
  car: [
    'Tesla', 'Nissan', 'Chevrolet', 'Ford', 'Toyota', 'Hyundai', 
    'Kia', 'Volkswagen', 'BMW', 'Audi', 'Mercedes-Benz', 'Jaguar', 
    'Porsche', 'Rivian', 'Lucid', 'Other'
  ],
  motorcycle: [
    'Zero', 'Energica', 'Harley-Davidson', 'LiveWire', 'NIU', 
    'Gogoro', 'Super Soco', 'Cake', 'Other'
  ],
  truck: [
    'Tesla', 'Rivian', 'Ford', 'Chevrolet', 'GMC', 'Other'
  ],
  bus: [
    'BYD', 'Proterra', 'New Flyer', 'VDL', 'Volvo', 'Other'
  ],
  van: [
    'Ford', 'Mercedes-Benz', 'Nissan', 'Rivian', 'BrightDrop', 'Other'
  ]
};

// Icon component to display different vehicle types
const VehicleIcon = ({ type }) => {
  switch(type) {
    case 'car':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2M5 12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2m-2-2h-5l-2-2H9l-2 2H5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 18.5 A2.5 2.5 0 0 1 6.5 16 A2.5 2.5 0 0 1 9 13.5 A2.5 2.5 0 0 1 11.5 16 A2.5 2.5 0 0 1 9 18.5 z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 18.5 A2.5 2.5 0 0 1 12.5 16 A2.5 2.5 0 0 1 15 13.5 A2.5 2.5 0 0 1 17.5 16 A2.5 2.5 0 0 1 15 18.5 z" />
        </svg>
      );
    case 'bike':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 8-5 5-2-3m0-5l2-2m2 2l2 3m-3-4l-1-3M4 16.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM17 16.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z" />
        </svg>
      );
    case 'truck':
      return <HiOutlineTruck className="h-8 w-8" />;
    case 'bus':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-8 4h2m-2-8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v12a2 2 0 0 0 2 2h2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19 A2 2 0 0 1 7 17 A2 2 0 0 1 9 15 A2 2 0 0 1 11 17 A2 2 0 0 1 9 19 z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19 A2 2 0 0 1 13 17 A2 2 0 0 1 15 15 A2 2 0 0 1 17 17 A2 2 0 0 1 15 19 z" />
        </svg>
      );
    case 'van':
      return <HiOutlineCube className="h-8 w-8" />;
    default:
      return <HiOutlineTruck className="h-8 w-8" />;
  }
};

const VehicleSelection = () => {
  const [step, setStep] = useState(1); // 1: Vehicle type, 2: Vehicle brand
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  
  // If user already has vehicle info, redirect to home
  useEffect(() => {
    if (user && user.vehicleInfo) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Handle vehicle type selection
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setStep(2);
  };
  
  // Handle vehicle brand selection
  const handleBrandSelect = (brand) => {
    
    // Update user profile with vehicle information
    const vehicleInfo = {
      type: selectedType,
      brand: brand
    };
    
    updateUserProfile({ ...user, vehicleInfo });
    
    // Navigate to home page
    navigate('/');
  };
  
  // Handle back button
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Select Your Vehicle Type' : 'Select Your Vehicle Brand'}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            {step === 1 
              ? 'Please select the type of electric vehicle you own' 
              : `Choose the brand of your ${selectedType === 'car' ? '4 Wheeler' 
                : selectedType === 'motorcycle' ? '2 Wheeler' 
                : selectedType}`}
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          {/* Step 1: Vehicle Type Selection */}
          {step === 1 && (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {vehicleTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <div className="flex items-center">
                    <div className="bg-emerald-100 rounded-lg p-2 text-emerald-600">
                      <VehicleIcon type={type.icon} />
                    </div>
                    <span className="ml-4 text-lg font-medium text-gray-900">{type.name}</span>
                  </div>
                  <HiChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              ))}
            </div>
          )}
          
          {/* Step 2: Vehicle Brand Selection */}
          {step === 2 && selectedType && (
            <>
              <div className="mb-4">
                <button 
                  onClick={handleBack}
                  className="text-emerald-600 hover:text-emerald-500 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Vehicle Types
                </button>
              </div>
              
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {vehicleBrands[selectedType].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-emerald-50 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <div className="h-12 w-12 rounded-full bg-gray-100 mb-2 flex items-center justify-center font-bold text-lg text-emerald-600">
                      {brand.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-900 text-center">{brand}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;