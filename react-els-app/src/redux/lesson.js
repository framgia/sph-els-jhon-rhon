import { createSlice } from '@reduxjs/toolkit';

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        lesson: {},
        lessonError: ''
    },
    reducers: {
        lessonData: (state, action) => {
            state.lessonError = '';
            state.lesson = action.payload;
        },
        setLessonError: (state, action) => {
            state.lessonError = action.payload;
        }
    }
});

export const { lessonData, setLessonError } = lessonSlice.actions;

export default lessonSlice.reducer;
