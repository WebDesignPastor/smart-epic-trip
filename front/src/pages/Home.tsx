import CityForm from '../components/CityForm'; // Adjust the import path as necessary

const HomePage = () => {
    const handleFormSubmit = (departure: string, arrival: string) => {
        console.log(`Departure: ${departure}, Arrival: ${arrival}`);
    };

    return (
        <div>
            <h1>Welcome to EpicRoadTrip !</h1>
            <CityForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default HomePage;
