import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const host = import.meta.env.VITE_HOST

function LocationsListComponent({ locations, deleteLocation }) {

  const handleDelete = (locationId) => {
    axios.delete(`http://${host}/api/v1/weather_data/${locationId}`)
      .then(() => {
        // Remove the location from the state to update the UI
        deleteLocation(locationId);
      })
      .catch(error => console.error('There was an error!', error));
  };

  return (
    <div>
      <List>
        {locations?.map((location) => (
          <ListItem
            key={location.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(location.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={location.location} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default LocationsListComponent;
