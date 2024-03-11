import React, { useState } from 'react';

interface CityFormProps {
    onSubmit: (departure: string, arrival: string) => void;
}

const CityForm: React.FC<CityFormProps> = ({ onSubmit }) => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(departure, arrival);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="departure">Departure City:</label>
                <input
                    id="departure"
                    type="text"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="arrival">Arrival City:</label>
                <input
                    id="arrival"
                    type="text"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CityForm;
