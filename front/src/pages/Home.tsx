// Home.tsx
import React from 'react';
import CityForm from '../components/CityForm';
import Nav from '../components/Nav';

const Home: React.FC = () => {

    const handleFormSubmit = (departure: string, arrival: string) => {
        console.log(`Departure: ${departure}, Arrival: ${arrival}`);
    };
  
    return (
        <div className="flex flex-col items-center h-screen">
            <Nav />
            <CityForm onSubmit={handleFormSubmit} />
        </div>
  );
}

export default Home;