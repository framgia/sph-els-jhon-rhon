import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        resultsData: {
            results: {score: '', total: ''},
            answers: {choice: '', answer: ''},
            lesson: {title: ''},
            words: {}
        },
        resultsError: {
            header: ''
        }
    },
    reducers: {
        setResultsData: (state, action) => {
            state.resultsError = {...state.resultsError, header: ''};
            state.resultsData = action.payload;
        },
        setResultsError: (state, action) => {
            state.resultsError = {...state.resultsError, [action.payload.key]: action.payload.value};
        }
    }
});

export const { setResultsData, setResultsError } = resultsSlice.actions;

export default resultsSlice.reducer;
