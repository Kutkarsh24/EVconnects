import React from 'react';
import { HiAdjustments, HiClock, HiLightningBolt, HiCalendar, HiTruck, HiClipboardCheck } from 'react-icons/hi';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "EV Parts & Accessories",
      description: "High-quality replacement parts and accessories for all major EV brands in India. We stock everything from charging cables to battery components.",
      icon: <HiTruck className="h-10 w-10" />
    },
    {
      id: 2,
      title: "EV Vehicle Service",
      description: "Professional maintenance and repair services by certified EV technicians. Our experts handle everything from software updates to battery diagnostics.",
      icon: <HiAdjustments className="h-10 w-10" />
    },
    {
      id: 3,
      title: "Routine Checkups",
      description: "Preventive maintenance plans to keep your EV in optimal condition. Regular inspections that extend battery life and improve performance.",
      icon: <HiClipboardCheck className="h-10 w-10" />
    },
    {
      id: 4,
      title: "Priority Charging Slots",
      description: "Book your charging slots in advance to avoid waiting times. Reserve premium charging stations during peak hours.",
      icon: <HiCalendar className="h-10 w-10" />
    },
    {
      id: 5,
      title: "Fast Charging",
      description: "Access to our network of high-speed charging stations that can charge your EV up to 80% in just 30 minutes.",
      icon: <HiLightningBolt className="h-10 w-10" />
    },
    {
      id: 6,
      title: "Roadside Assistance",
      description: "24/7 emergency roadside assistance for EV owners. Our specialized team handles everything from battery depletion to technical malfunctions.",
      icon: <HiClock className="h-10 w-10" />
    }
  ];

  // Safe background image handling - fixing the PUBLIC_URL reference
  const heroBackgroundStyle = {
    backgroundImage: `url('/bg.gif')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <div className="relative py-16 bg-gradient-to-r from-emerald-500 to-emerald-700">
        <div className="absolute inset-0 opacity-20" style={heroBackgroundStyle}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Our Services
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/90 mb-8">
            Comprehensive solutions for all your electric vehicle needs
          </p>
        </div>
      </div>
      
      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-emerald-500 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-emerald-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Service?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-emerald-100 mb-8">
            We offer tailored solutions for fleet operators, businesses, and individual EV owners with specific requirements.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-700 focus:ring-white">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;