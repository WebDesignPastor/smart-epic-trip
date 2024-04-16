import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

interface Location {
    lat: number
    lng: number
}

export interface TripDetails {
    origin: string
    destination: string
}

export interface Dir {
    location: Location
    stopover: boolean
}

export interface Waypoints {
    place_id?: string
    event_id?: string
    dir: Dir
}

export interface DirectionsOptions {
    origin: google.maps.LatLngLiteral
    destination: google.maps.LatLngLiteral
    travelMode: google.maps.TravelMode
    avoidHighways: boolean
    waypoints?: Dir[]
    optimizeWaypoints: Boolean
}

export interface InitialState {
    tripDetails: TripDetails[]
    directionsOptions: DirectionsOptions
    waypointsDetails: WaypointsDetails[]
    baseWaypoints: Waypoints[]
    startDate: string 
    endDate: string
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
    },
    waypointsDetails: [],
    baseWaypoints: [],
    startDate: '',
    endDate: ''
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
            state.directionsOptions.waypoints?.push(action.payload.dir)
            state.baseWaypoints.push(action.payload)
        },
        addWaypointsDetails: (state, action: PayloadAction<WaypointsDetails>) => {
            return {
                ...state,
                waypointsDetails: [...state.waypointsDetails, action.payload]
            }
        },
        removeWaypoint: (state, action: PayloadAction<string>) => {
            const wpToRemoveIndex = state.baseWaypoints.findIndex(wp => (wp.place_id === action.payload || wp.event_id === action.payload))
            const wpToRemove = state.baseWaypoints.find((wp) => (wp.place_id === action.payload || wp.event_id === action.payload))
            if(wpToRemoveIndex !== -1) {
                if(state.directionsOptions.waypoints?.length !== undefined && state.directionsOptions.waypoints?.length > 0) {
                    const wpDirectionIndex = state.directionsOptions.waypoints.findIndex(wp => current(wp) == current(wpToRemove?.dir))
                    state.directionsOptions.waypoints.splice(wpDirectionIndex, 1)
                }
                state.baseWaypoints.splice(wpToRemoveIndex, 1)
                const wpDetailsRemoveIndex = state.waypointsDetails.findIndex((wp) => (wp.place_id === action.payload || wp.event_id === action.payload))
                if(wpDetailsRemoveIndex !== -1) {
                    state.waypointsDetails.splice(wpDetailsRemoveIndex, 1)
                }
            }
        },
        setDepartureDate: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                startDate: action.payload
            }
        },
        setArrivlaDate:  (state, action: PayloadAction<string>) => {
            return {
                ...state,
                endDate: action.payload
            }
        }
    }
    
})

export const {setTrip, setOrigin, setDestination, addWaypoint, addWaypointsDetails, removeWaypoint, setArrivlaDate, setDepartureDate} = appSlice.actions
export default appSlice.reducer