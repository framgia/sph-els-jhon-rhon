import { createSlice } from '@reduxjs/toolkit';

export const activitiesSlice = createSlice({
    name: 'activities',
    initialState: {
        activitiesData: {},
        activitiesError: {
            header: ''
        }
    },
    reducers: {
        setActivitiesData: (state, action) => {
            state.activitiesData = action.payload;
        },
        setActivitiesErrors: (state, action) => {
            state.activitiesError = { ...state.activitiesError, [action.payload.key]: action.payload.value };
        }   
    }
});

export const { setActivitiesData, setActivitiesErrors } = activitiesSlice.actions;

export default activitiesSlice.reducer;
