import React, { useState } from 'react';

const LocationTracker = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError(null);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLocation({ lat: null, lon: null });
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const formatCoordinate = (coord, isLatitude) => {
    const absolute = Math.abs(coord);
    const degrees = Math.floor(absolute);
    const minutes = Math.floor((absolute - degrees) * 60);
    const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(1);
    
    // Determine the direction based on latitude or longitude
    const direction = isLatitude
      ? coord >= 0
        ? 'N'
        : 'S'
      : coord >= 0
      ? 'E'
      : 'W';

    return `${degrees}°${minutes}'${seconds}"${direction}`;
  };

  const openInGoogleMaps = () => {
    if (location.lat && location.lon) {
      const url = `https://www.google.com/maps?q=${location.lat},${location.lon}`;
      window.open(url, '_blank');
    }
  };

  const latitudeFormatted = location.lat ? formatCoordinate(location.lat, true) : '';
  const longitudeFormatted = location.lon ? formatCoordinate(location.lon, false) : '';

  return (
    <div>
      <button onClick={getLocation} disabled={loading}>
        {loading ? 'Fetching Location...' : 'Get Current Location'}
      </button>
      {location.lat && location.lon && (
        <div>
          <p>Latitude: {latitudeFormatted}</p>
          <p>Longitude: {longitudeFormatted}</p>
          <button onClick={openInGoogleMaps}>Open in Google Maps</button>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default LocationTracker;
