import React from 'react';
import LocationContainer from './LocationContainer';

import { Box } from '@mui/material';
function App() {
  return (
    <Box sx={{ 
      display: 'flex', // Enables flexbox properties
      flexDirection: 'column', // Aligns children vertically; use 'row' for horizontal alignment
      alignItems: 'center', // Centers children horizontally in the container
      width: '100%', // Full width of the parent
      height: '100vh', // Full height of the viewport
      maxWidth: 360, // Maximum width of the content
      bgcolor: 'background.paper',
      textAlign: 'center' // Centers text within the children
    }}>
      <LocationContainer />
    </Box>
  );
}

export default App;