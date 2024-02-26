import React from 'react';
import { Paper } from '@mui/material';
import './WeatherTable.scss';

const WeatherTable = ({ data }) => {
  const days = Object.entries(data).map(([date, status]) => ({
    date,
    status,
  }));

  return (
    <Paper className="calendar-container">
      {days.map(({ date, status }, index) => (
        <div
          key={index}
          className={`day ${status === 'valid' ? 'valid' : 'invalid'}`}
        >
          <span className="date">{date}</span>
          <span className="status">{status}</span>
        </div>
      ))}
    </Paper>
  );
};

export default WeatherTable;
