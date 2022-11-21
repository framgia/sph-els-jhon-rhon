import { createSlice } from '@reduxjs/toolkit';

export const wordsSlice = createSlice({
    name: 'words',
    initialState: {
        wordsData: {},
        wordsError: ''
    },
    reducers: {
        setWordsData: (state, action) => {
            state.wordsError = '';
            state.wordsData = action.payload;
        },
        setWordsError: (state, action) => {
            if (action.paylad) {
                state.wordsError = action.payload;
            }

            state.wordsError = 'Failed to fetch words';
        }
    }
});

export const { setWordsData, setWordsError } = wordsSlice.actions;

export default wordsSlice.reducer;
