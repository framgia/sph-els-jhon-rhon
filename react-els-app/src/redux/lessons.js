import { createSlice } from "@reduxjs/toolkit";

export const lessonsSlice = createSlice({
    name: 'lessons',
    initialState: {
        lessonsData: {},
        lessonsError: ''
    },
    reducers: {
        setLessonsData: (state, action) => {
            state.lessonsError = '';
            state.lessonsData = action.payload;
        },
        setLessonsError: (state) => {
            state.lessonsError = 'Failed to fetch lessons';
        }
    }
});

export const { setLessonsData, setLessonsError } = lessonsSlice.actions;

export default lessonsSlice.reducer;
