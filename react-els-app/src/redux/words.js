import { createSlice } from '@reduxjs/toolkit';

export const wordsSlice = createSlice({
    name: 'words',
    initialState: {
        wordsData: {},
        wordsError: {
            header: ''
        }
    },
    reducers: {
        setWordsData: (state, action) => {
            state.wordsError = {};
            state.wordsData = action.payload;
        },
        setWordsError: (state, action) => {
            if (action.paylad) {
                state.wordsError = {...state.wordsError, [action.payload.key]: action.payload.value};
            }
            
            state.wordsError = {...state.wordsError, header: 'Failed to fetch words'};
        }
    }
});

export const { setWordsData, setWordsError } = wordsSlice.actions;

export default wordsSlice.reducer;
