import { createSlice } from '@reduxjs/toolkit';

export const lessonsLearnedSlice = createSlice({
    name: 'lessonsLearned',
    initialState: {
        lessonsLearnedData: {
            id: '',
            title: ''
        },
        lessonsLearnedError: {
            header: ''
        }
    },
    reducers: {
        setLessonsLearnedData: (state, action) => {
            state.lessonsLearnedError = {};
            state.lessonsLearnedData = action.payload;
        },
        setLessonsLearnedError: (state, action) => {
            state.lessonsLearnedError = {...state.lessonsLearnedError, [action.payload.key]: action.payload.value};
        }
    }
});

export const { setLessonsLearnedData, setLessonsLearnedError } = lessonsLearnedSlice.actions;

export default lessonsLearnedSlice.reducer;
