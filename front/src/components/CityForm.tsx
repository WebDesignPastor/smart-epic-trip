import React, { useState, useEffect, useRef } from 'react';
import { loadGoogleMapsAPI } from '../utils/loadGoogleMapsAPI';
import { useDispatch } from 'react-redux';
import { addDirection } from '../slices/store';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

interface CityFormProps {
    onSubmit: (departure: string, arrival: string) => void;
}

const CityForm: React.FC<CityFormProps> = ({ onSubmit }) => {
    const dispatch = useDispatch()
    const apiUrl = import.meta.env.VITE_API_URL
    const [departure, setDeparture] = useState('')
    const [arrival, setArrival] = useState('')
    const [submissionMessage, setSubmissionMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Refs for the Autocomplete instances
    const departureAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const arrivalAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    useEffect(() => {
        loadGoogleMapsAPI(() => {
            const options = { types: ['(cities)'] };
            if (window.google && window.google.maps && window.google.maps.places) {
                departureAutocompleteRef.current = new window.google.maps.places.Autocomplete(document.getElementById('departure') as HTMLInputElement, options);
                arrivalAutocompleteRef.current = new window.google.maps.places.Autocomplete(document.getElementById('arrival') as HTMLInputElement, options);
                
                // Attach event listener for departure autocomplete
                departureAutocompleteRef.current.addListener('place_changed', () => {
                    const place = departureAutocompleteRef.current?.getPlace();
                    if (place && place.address_components) {
                        setDeparture(place.formatted_address!);
                    }
                });

                // Attach event listener for arrival autocomplete
                arrivalAutocompleteRef.current.addListener('place_changed', () => {
                    const place = arrivalAutocompleteRef.current?.getPlace();
                    if (place && place.address_components) {
                        setArrival(place.formatted_address!);
                    }
                });
            }
        });
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if(departure !== '' && arrival !== '') {
            setIsLoading(!isLoading)
            onSubmit(departure, arrival)
            setSubmissionMessage(`Vous allez de ${departure} à ${arrival}`)
            const departureLocationReq = await axios.get(`${apiUrl}/geocode?address=${departure}`)
            const arrivalLocationReq = await axios.get(`${apiUrl}/geocode?address=${arrival}`)
            const departureLocation = departureLocationReq.data.results[0].geometry.location
            const arrivalLocation = arrivalLocationReq.data.results[0].geometry.location
            let destinations = {origin: departureLocation, destination: arrivalLocation}
            dispatch(addDirection(destinations))
            setIsLoading(!isLoading)
            navigate('/map')
        }
    }

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
            <form className="space-y-4">
                <div>
                    <label htmlFor="departure" className="block text-sm font-medium text-gray-700">Departure City:</label>
                    <input
                        id="departure"
                        type="text"
                        value={departure}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setDeparture(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="arrival" className="block text-sm font-medium text-gray-700">Arrival City:</label>
                    <input
                        id="arrival"
                        type="text"
                        value={arrival}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setArrival(e.target.value)}
                    />
                </div>
                {isLoading ?
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Okay let's gooo
                    </button>
                    :
                    <button onClick={handleSubmit} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Okay let's gooo
                    </button>
                }
                
            </form>
            {submissionMessage && <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">{submissionMessage}</div>}
        </div>
    );
};

export default CityForm;