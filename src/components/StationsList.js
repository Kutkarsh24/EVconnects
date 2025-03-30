import React from 'react';
import StationCard from './StationCard';

const StationsList = ({ stations, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        <span className="ml-3 text-lg text-gray-700">Searching for charging stations...</span>
      </div>
    );
  }

  if (!stations || stations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No charging stations found in this area.</p>
        <p className="text-gray-500 mt-2">Try searching in a different location.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Charging Stations Near You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
    </div>
  );
};

export default StationsList;