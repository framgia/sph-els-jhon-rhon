import { createSlice } from '@reduxjs/toolkit';

export const wordsLearnedSlice = createSlice({
    name: 'wordsLearned',
    initialState: {
        wordsLearnedData: {
            words: {
                id: '',
                word: ''
            },
            answers: {
                id: '',
                word_id: '',
                choice: ''
            }
        },
        wordsLearnedError: {
            header: ''
        }
    },
    reducers: {
        setWordsLearnedData: (state, action) => {
            state.wordsLearnedError = {};
            state.wordsLearnedData[action.payload.key] = action.payload.value;
        },
        setWordsLearnedError: (state, action) => {
            state.wordsLearnedError = {...state.wordsLearnedError, [action.payload.key]: action.payload.value};
        }
    }
});

export const { setWordsLearnedData, setWordsLearnedError } = wordsLearnedSlice.actions;

export default wordsLearnedSlice.reducer;
