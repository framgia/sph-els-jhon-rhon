import { createSlice } from '@reduxjs/toolkit';

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        lesson: {},
        lessonError: {
            header: ''
        },
    },
    reducers: {
        lessonData: (state, action) => {
            state.lessonError = {};
            state.lesson = action.payload;
        },
        setLessonError: (state, action) => {
            state.lessonError = {...state.lessonError, [action.payload.key]: action.payload.value};
        }
    }
});

export const { lessonData, setLessonError } = lessonSlice.actions;

export default lessonSlice.reducer;
