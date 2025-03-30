import React, { useState, useEffect } from 'react';
import { stationService } from '../services/apiService';

interface Coordinates {
  lat: number;
  lng: number;
}

interface ChargerType {
  type: string;
  power: number;
  connector: string;
  available: boolean;
}

interface Station {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  location: {
    type: string;
    coordinates: number[];
  };
  chargers: ChargerType[];
  pricing: {
    currency: string;
    perKWh: number;
    minimumFee?: number;
  };
  ratings: {
    average: number;
    count: number;
  };
}

interface StationMapProps {
  initialCenter?: Coordinates;
  zoom?: number;
  onStationSelect?: (station: Station) => void;
}

const StationMap: React.FC<StationMapProps> = ({
  initialCenter = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  zoom = 12,
  onStationSelect
}) => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.error('Error getting location:', err);
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  }, []);

  // Fetch nearby stations when user location changes
  useEffect(() => {
    const fetchNearbyStations = async () => {
      try {
        setLoading(true);
        const location = userLocation || initialCenter;
        const response = await stationService.getNearbyStations(location.lat, location.lng, 10);
        setStations(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stations:', err);
        setError('Failed to load charging stations');
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyStations();
  }, [userLocation, initialCenter]);

  // Handle station selection
  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    if (onStationSelect) {
      onStationSelect(station);
    }
  };

  // This component would typically integrate with a mapping library
  // such as Google Maps, Mapbox, or Leaflet
  return (
    <div className="station-map">
      {loading ? (
        <div className="loading">Loading stations...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="map-container">
          {/* Map implementation would go here */}
          <div className="map-placeholder">
            <p>Map showing {stations.length} charging stations</p>
            {userLocation && (
              <p>Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
            )}
          </div>
          
          <div className="stations-list">
            <h3>Nearby Charging Stations</h3>
            <ul>
              {stations.map(station => (
                <li 
                  key={station._id} 
                  className={selectedStation?._id === station._id ? 'selected' : ''}
                  onClick={() => handleStationClick(station)}
                >
                  <h4>{station.name}</h4>
                  <p>{station.address.street}, {station.address.city}</p>
                  <p>Price: {station.pricing.perKWh} {station.pricing.currency}/kWh</p>
                  <p>Available chargers: {station.chargers.filter(c => c.available).length}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationMap;