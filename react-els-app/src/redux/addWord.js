import { createSlice } from "@reduxjs/toolkit";

export const addWordSlice = createSlice({
    name: 'addWord',
    initialState: {
        wordData: {
            word: '',
            answer: '',
            choice2: '',
            choice3: '',
            choice4: ''
        },
        wordErrors: {
            word: '',
            answer: '',
            choice2: '',
            choice3: '',
            choice4: '',
            header: ''
        }
    },
    reducers: {
        setWordData: (state, action) => {
            state.wordData = { ...state.wordData, [action.payload.key]: action.payload.value };
        },
        setWordErrors: (state, action) => {
            state.wordErrors = { ...state.wordErrors, [action.payload.key]: action.payload.value };
        }   
    }
});

export const { setWordData, setWordErrors } = addWordSlice.actions;

export default addWordSlice.reducer;
