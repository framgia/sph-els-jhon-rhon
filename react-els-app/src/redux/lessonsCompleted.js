import { createSlice } from '@reduxjs/toolkit';

export const lessonsCompletedSlice = createSlice({
    name: 'lessonsCompleted',
    initialState: {
        completedData: {},
    },
    reducers: {
        setLessonsCompleted: (state, action) => {
            state.completedData = action.payload;
        }
    }
});

export const { setLessonsCompleted } = lessonsCompletedSlice.actions;

export default lessonsCompletedSlice.reducer;
