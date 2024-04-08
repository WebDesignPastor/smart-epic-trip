import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Location {
    lat: number
    lng: number
}

export interface InitialState {
    tripDetails: TripDetails[]
    directionsOptions: DirectionsOptions
}

export interface TripDetails {
    origin: string
    destination: string
}

export interface Waypoints {
    location: Location
    stopover: boolean
}

export interface DirectionsOptions {
    origin: google.maps.LatLngLiteral
    destination: google.maps.LatLngLiteral
    travelMode: google.maps.TravelMode
    avoidHighways: boolean
    waypoints?: Waypoints[]
    optimizeWaypoints: Boolean
}

const initialState: InitialState = {
    tripDetails: [],
    directionsOptions: {
        origin: {lat: 48.084328, lng: -1.68333},
        destination: { lat: 47.750000, lng: -3.3666700 },
        travelMode: 'DRIVING' as google.maps.TravelMode,
        avoidHighways: false,
        waypoints: [],
        optimizeWaypoints: true
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTrip: (state, action: PayloadAction<TripDetails>) => {
            state.tripDetails = [...state.tripDetails, action.payload]
        },
        setOrigin: (state, action: PayloadAction<Location>) => {
            return {
                ...state,
                directionsOptions: {
                    ...state.directionsOptions,
                    origin: action.payload
                }
            }
        },
        setDestination: (state, action: PayloadAction<Location>) => {
            return {
                ...state,
                directionsOptions: {
                    ...state.directionsOptions,
                    destination: action.payload
                }
            }
        },
        addWaypoint: (state, action: PayloadAction<Waypoints>) => {
            state.directionsOptions.waypoints?.push(action.payload)
        }
    }
    
})

export const {setTrip, setOrigin, setDestination, addWaypoint} = appSlice.actions
export default appSlice.reducer