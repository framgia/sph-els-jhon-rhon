import { createSlice } from "@reduxjs/toolkit";

export const editLessonSlice = createSlice({
    name: 'editLesson',
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
        editLessonData: (state, action) => {
            state.lessonData = { ...state.lessonData, [action.payload.key]: action.payload.value };
        },
        editLessonErrors: (state, action) => {
            state.lessonErrors = { ...state.lessonErrors, [action.payload.key]: action.payload.value };
        }   
    }
});

export const { editLessonData, editLessonErrors } = editLessonSlice.actions;

export default editLessonSlice.reducer;
