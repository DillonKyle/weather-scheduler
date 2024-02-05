import React from 'react';
import { Marker } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const GeocoderControl = ({
  marker,
  addMarker,
  mapboxAccessToken,
  position,
  onLoading = () => {},
  onResults = () => {},
  onResult = () => {},
  onError = () => {},
  ...props
}) => {

  useControl(
    () => {
      const geocoder = new MapboxGeocoder({
        ...props,
        accessToken: mapboxAccessToken,
      });

      geocoder.on('loading', onLoading);
      geocoder.on('results', onResults);
      geocoder.on('result', (event) => {
        onResult(event);
        console.log(event.result.place_name)
        const location = event.result?.center || (event.result?.geometry?.type === 'Point' && event.result.geometry.coordinates);
        if (location) {
          addMarker(<Marker name={event.result.place_name} longitude={location[0]} latitude={location[1]} />);
        } else {
          addMarker(null);
        }
      });
      geocoder.on('error', onError);

      return geocoder;
    },
    { position }
  );

  return marker;
};

export default GeocoderControl;
