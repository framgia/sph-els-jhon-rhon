import { createSlice } from "@reduxjs/toolkit";

export const addLessonSlice = createSlice({
    name: 'addLesson',
    initialState: {
        lessonData: {
            title: '',
            description: ''
        },
        lessonErrors: {
            title: '',
            description: '',
            header: ''
        }
    },
    reducers: {
        setLessonData: (state, action) => {
            state.lessonData = { ...state.lessonData, [action.payload.key]: action.payload.value };
        },
        setLessonErrors: (state, action) => {
            state.lessonErrors = { ...state.lessonErrors, [action.payload.key]: action.payload.value };
        }
    }
});

export const { setLessonData, setLessonErrors } = addLessonSlice.actions;

export default addLessonSlice.reducer;
