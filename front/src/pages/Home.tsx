// Home.tsx
import React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CityMap from '../components/CityMap'; // Corrected import path

const Home: React.FC = () => {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  
  return (
    <Wrapper apiKey={apiKey} render={render}>
        <CityMap defaultLat={40.7128} defaultLng={-74.0060} defaultZoom={12} />
    </Wrapper>
  );
}

export default Home;