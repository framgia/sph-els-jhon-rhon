import { createSlice } from '@reduxjs/toolkit';

export const lessonsSlice = createSlice({
    name: 'lessons',
    initialState: {
        lessonsData: {},
        lessonsError: '',
        lessonsWord: {},
    },
    reducers: {
        setLessonsData: (state, action) => {
            state.lessonsError = '';
            state.lessonsData = action.payload;
        },
        setLessonsError: (state) => {
            state.lessonsError = 'Failed to fetch lessons';
        },
        setLessonsWord: (state, action) => {
            state.lessonsWord = action.payload;
        }
    }
});

export const { setLessonsData, setLessonsError, setLessonsWord } = lessonsSlice.actions;

export default lessonsSlice.reducer;
