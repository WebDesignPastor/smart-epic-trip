import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Directions {
    origin: string
    destination: string
}

export interface InitialState {
    directions: Directions[]
}

const initialState: InitialState = {
    directions: []
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addDirection: (state, action: PayloadAction<Directions>) => {
                state.directions = [...state.directions, action.payload]
        }
    }
    
})

export const {addDirection} = appSlice.actions
export default appSlice.reducer