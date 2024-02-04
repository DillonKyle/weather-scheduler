import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import locations from '../data/locations.json'; // Adjust the path as necessary

import axios from 'axios';

const host = import.meta.env.VITE_HOST

function AddLocationComponent({ addLocation }) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (selectedState) {
      setCities(locations[selectedState]);
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity(''); // Reset city selection when state changes
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = () => {
    axios.post(`${host}/api/v1/weather_data`, { location: selectedCity })
      .then((resp) => {
        console.log(resp.data)
        addLocation(resp.data)
      })
      .catch(error => console.error('There was an error!', error));
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          id="state-select"
          value={selectedState}
          label="State"
          onChange={handleStateChange}
        >
          {Object.keys(locations).map((state) => (
            <MenuItem key={state} value={state}>{state}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          id="city-select"
          value={selectedCity}
          label="City"
          onChange={handleCityChange}
          disabled={!selectedState} // Disable until a state is selected
        >
          {cities.map((city, index) => (
            <MenuItem key={index} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Submit
      </Button>
    </div>
  );
}

export default AddLocationComponent;
