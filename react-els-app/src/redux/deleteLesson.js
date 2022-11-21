import { createSlice } from "@reduxjs/toolkit";

export const deleteLessonSlice = createSlice({
    name: 'deleteLesson',
    initialState: {
        deleteKey: '',
        deleteError: ''
    },
    reducers: {
        deleteLessonKey: (state, action) => {
            state.deleteKey = action.payload;
        },
        setDeleteError: (state, action) => {
            state.deleteError = action.payload;
        }   
    }
});

export const { deleteLessonKey, setDeleteError } = deleteLessonSlice.actions;

export default deleteLessonSlice.reducer;
