import React, { useState, useEffect } from 'react';
import { loadGoogleMapsAPI } from '../assets/loadGoogleMapsAPI';

const CityForm = ({ onSubmit }) => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');

    useEffect(() => {
        loadGoogleMapsAPI(() => {
            // Initialize autocomplete for both input fields after the API script has loaded
            const options = { types: ['(cities)'] }; // Restrict search to cities
            new window.google.maps.places.Autocomplete(document.getElementById('departure'), options);
            new window.google.maps.places.Autocomplete(document.getElementById('arrival'), options);
        });
    }, []);

    const handleSubmit = (e) => {
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
