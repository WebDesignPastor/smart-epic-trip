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
                <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl items-center text-center justify-center flex mt-6'>Welcome to EpicRoadTrip !</h1>
                <CityForm onSubmit={handleFormSubmit} />
        </div>
  );
}

export default Home;