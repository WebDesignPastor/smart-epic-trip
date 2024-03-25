// Home.tsx
import React from 'react';
import CityForm from '../components/CityForm';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const Home: React.FC = () => {

    const handleFormSubmit = (departure: string, arrival: string) => {
        console.log(`Departure: ${departure}, Arrival: ${arrival}`);
    };
  
    return (
        <div>
                <h1>Welcome to EpicRoadTrip !</h1>
                <CityForm onSubmit={handleFormSubmit} />
        </div>
  );
}

export default Home;