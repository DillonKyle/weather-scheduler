import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Assuming `data` is the JSON object you've provided
const WeatherTable = ({ data }) => {
  const rows = data.list; // Access the list of weather data

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="weather data table">
        <TableHead>
          <TableRow>
            <TableCell>Date/Time</TableCell>
            <TableCell align="right">Temperature (F)</TableCell>
            <TableCell align="right">Weather</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.dt}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dt_txt}
              </TableCell>
              <TableCell align="right">{row.main.temp}</TableCell>
              <TableCell align="right">{row.weather[0].main}</TableCell>
              <TableCell align="right">{row.weather[0].description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;
