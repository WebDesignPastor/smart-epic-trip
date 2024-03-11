import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InitialState {
    issues: string[]
}

const initialState: InitialState = {
    issues: []
}

const issueSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        addIssue: (state, action: PayloadAction<string>) => {
                state.issues = [...state.issues, action.payload]
        }
    }
    
})

export const {addIssue} = issueSlice.actions
export default issueSlice.reducer