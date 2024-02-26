import React from 'react';
import { useMap } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';
import { Button } from '@mui/material';

const host = import.meta.env.VITE_HOST

const StoreLocationControl = ({ 
  addLocation, 
  currentMarker,
}) => {
  const map = useMap();

  const handleSubmit = () => {
    axios.post(`${host}/api/v1/locations`, {
      name: currentMarker.props.name,
      latitude: currentMarker.props.latitude,
      longitude: currentMarker.props.longitude,
    })
    .then((resp) => {
      addLocation({
        name: resp.data.name,
        latitude: resp.data.latitude,
        longitude: resp.data.longitude,
      });
    })
    .catch(error => console.error('There was an error!', error));
  }

  return (
    <div style={{ position: 'absolute', top: 50, left: 10, zIndex: 1 }}>
      {currentMarker && (
      <Button variant="contained" onClick={handleSubmit}>
        Save Location
      </Button>
      )}
    </div>
  );
};

export default StoreLocationControl;
