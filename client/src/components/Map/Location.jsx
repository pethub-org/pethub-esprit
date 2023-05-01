import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.scss';
import axios from "axios";
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5pczc4OSIsImEiOiJjbGd2YmFybjUwMWh0M2xuMWdpOHBmYXJrIn0.pgwO7v2KveiHf7NDJ5j-Mw';

const Location = ({ setOpen , post }) => {
  const [lng, setLng] = useState(10,18962);
  const [lat, setLat] = useState(36,89771);
  const [zoom, setZoom] = useState(12);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  
  const updatePostLocation = async (latitude, longitude, postId) => {
    try {
      const response = await axios.post(`/posts/${postId}/location`, {
        latitude,
        longitude,
        address
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSaveLocation = () => {
    if (post && post._id) {
      updatePostLocation(latitude, longitude, post._id);
      setOpen(false);
    } else {
      console.error('Post ID is not defined');
    }
  };
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    
    map.on('move', async () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
      setLatitude(map.getCenter().lat.toFixed(4));
      setLongitude(map.getCenter().lng.toFixed(4));
      
      try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${map.getCenter().lng.toFixed(4)},${map.getCenter().lat.toFixed(4)}.json?access_token=${mapboxgl.accessToken}`);
        setAddress(response.data.features[0].place_name);
      } catch (error) {
        console.error(error);
      }
    });
    
    return () => {
      map.remove();
    };
  }, []);
  
  return (
    <div>
      <div className='sidebar'>
        Address : {address}
      </div>
      <div>
        <p style={{ color: "gray" }}>{address}</p>
      </div>
      <div id='map' style={{ height: '400' }} className='mapbox-container' />
      <button onClick={handleSaveLocation}>Save location</button>
    </div>
  );
};

export default Location;
