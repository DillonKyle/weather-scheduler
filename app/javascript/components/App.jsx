import React, { useState, useEffect } from 'react';
import LocationsListComponent from './LocationsListComponent';

import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import GeocoderControl from './GeocoderControl';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button } from '@mui/material';
import StoreLocationControl from './StoreLocationControl';
import WeatherTable from './WeatherTable';
import './App.scss'

const host = import.meta.env.VITE_HOST

const TOKEN = import.meta.env.VITE_MAPBOX;

function App() {
  const [locations, setLocations] = useState([]);
  const [marker, setMarker] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get(`${host}/api/v1/locations`)
      .then(response => {
        console.log(response.data)
        setLocations(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  const addLocation = (newLocation) => {
    setLocations([...locations, newLocation]);
  };

  const addMarker = (newMarker) => {
    setMarker(newMarker);
  };

  const deleteLocation = (locationId) => {
    setLocations(locations.filter(location => location.id !== locationId));
  };

  const fetchWeather = () => {
    axios.get(`${host}/api/v1/locations/fetch_all`)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data)
      })
      .catch(error => console.error('There was an error!', error));
  }

  return (
    <div>
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      bgcolor: 'background.paper',
      textAlign: 'center',
      padding: 5
    }}>
      <div>
        <LocationOnIcon />
        <h3>Selected Locations</h3>
        {locations && (
          <>
            <LocationsListComponent locations={locations} deleteLocation={deleteLocation} />
            <Button variant="contained" onClick={fetchWeather}>
              Fetch Weather For Locations
            </Button>
          </>
        )}
        {weatherData && (
          <div className='weather-tables'>
            {weatherData.map((location) => (
              <>
                <h4>{location.location_name} Weather Report</h4>
                <WeatherTable data={location.weather}/>
              </>
            ))}
          </div>
        )}
      </div>
      
      <div  style={{ height: '50vh', width: '50vw' }}>
        <Map
          initialViewState={{
            longitude: -79.4512,
            latitude: 43.6568,
            zoom: 13
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
        >
          <GeocoderControl marker={marker} addMarker={addMarker} mapboxAccessToken={TOKEN} position="top-left" />
          <StoreLocationControl currentMarker={marker} mapboxAccessToken={TOKEN} position="top-left" addLocation={addLocation}/>
        </Map>
      </div>
    </Box>

    </div>
  );
}

export default App;