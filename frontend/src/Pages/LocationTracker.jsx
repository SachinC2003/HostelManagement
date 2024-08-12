import React, { useState } from 'react';

const LocationTracker = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const openInGoogleMaps = () => {
    if (location.latitude && location.longitude) {
      const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      window.open(googleMapsUrl, '_blank');
    } else {
      alert("Location is not available. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={getLocation}>Get Current Location</button>
      {location.latitude && location.longitude && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <button onClick={openInGoogleMaps}>Open in Google Maps</button>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;
