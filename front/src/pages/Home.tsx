// Home.tsx
import React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CityMap from '../components/CityMap'; // Corrected import path

const Home: React.FC = () => {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={import.meta.env.API_GOOGLEMAP_KEY} render={render}>
        <CityMap defaultLat={40.7128} defaultLng={-74.0060} defaultZoom={12} />
    </Wrapper>
  );
}

export default Home;