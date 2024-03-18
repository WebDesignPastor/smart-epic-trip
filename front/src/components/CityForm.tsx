import React, { useState, useEffect } from 'react';
import { loadGoogleMapsAPI } from '../utils/loadGoogleMapsAPI';

interface CityFormProps {
    onSubmit: (departure: string, arrival: string) => void;
  }

const CityForm: React.FC<CityFormProps> = ({ onSubmit }) => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('')

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onSubmit(departure, arrival);
        setSubmissionMessage(`Vous allez de ${departure} à ${arrival}`);
    };

    return (
        <>
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
                <button type="submit">Okay let's gooo</button>
            </form>
            {submissionMessage && <div>{submissionMessage}</div>}
        </>
    );
};

export default CityForm;
