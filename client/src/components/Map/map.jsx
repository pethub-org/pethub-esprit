import React, { useState, useEffect } from 'react';
import './map.scss';
import mapboxgl from 'mapbox-gl';

const Map = ({ setOpen, setLocation, onLocationSelected }) => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelect = (address, lat, lng) => {
    const location = [lat, lng];
    setLocation(location);
    onLocationSelected(location);
  };

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5pczc4OSIsImEiOiJjbGd2YmFybjUwMWh0M2xuMWdpOHBmYXJrIn0.pgwO7v2KveiHf7NDJ5j-Mw';
    const mapboxMap = new mapboxgl.Map({
      container: 'mapbox-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1
    });
    setMap(mapboxMap);
  }, []);

  useEffect(() => {
    if (map) {
      const handleClick = (e) => {
        const location = [e.lngLat.lng, e.lngLat.lat];
        setSelectedLocation(location);
        handleSelect(null, location[1], location[0]);
      };
      map.on('click', handleClick);
      return () => map.off('click', handleClick);
    }
  }, [map, handleSelect]);

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation);
      setOpen(false);
    }
  }, [selectedLocation, setLocation, setOpen]);

  return (
    <div className="map-container">
      <div id="mapbox-container" className="mapbox-container" />
      <button className="location-button" onClick={() => setOpen(false)}>Cancel</button>
    </div>
  );
};

export default Map;
