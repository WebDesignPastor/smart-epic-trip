import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Location {
    lat: number
    lng: number
}

interface Directions {
    origin: Location
    destination: Location
}

export interface InitialState {
    directions: Directions[]
    tripDetails: TripDetails[]
}

export interface TripDetails {
    origin: string
    destination: string
}

const initialState: InitialState = {
    directions: [],
    tripDetails: []
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addDirection: (state, action: PayloadAction<Directions>) => {
                state.directions = [...state.directions, action.payload]
        },
        setTrip: (state, action: PayloadAction<TripDetails>) => {
            state.tripDetails = [...state.tripDetails, action.payload]
        }
    }
    
})

export const {addDirection, setTrip} = appSlice.actions
export default appSlice.reducer