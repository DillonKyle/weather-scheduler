import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLocationComponent from './AddLocationComponent';
import LocationsListComponent from './LocationsListComponent';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function LocationContainer() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch the list of cities initially
    axios.get('http://localhost:3000/api/v1/weather_data')
      .then(response => {
        console.log(response.data)
        setLocations(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  const addLocation = (newLocation) => {
    setLocations([...locations, newLocation]);
  };

  const deleteLocation = (locationId) => {
    setLocations(locations.filter(location => location.id !== locationId));
  };

  return (
    <div>
      <LocationOnIcon />
      <h3>Select Location</h3>
      <AddLocationComponent addLocation={addLocation} />
      <LocationsListComponent locations={locations} deleteLocation={deleteLocation} />
    </div>
  );
}

export default LocationContainer;
