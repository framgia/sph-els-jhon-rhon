import { createSlice } from '@reduxjs/toolkit';

export const editWordSlice = createSlice({
    name: 'editWord',
    initialState: {
        wordData: {
            word: '',
            answer: '',
            choice2: '',
            choice3: '',
            choice4: '',
            choicesId: {
                answer: '',
                choice2: '',
                choice3: '',
                choice4: ''
            }
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
        setEditWordData: (state, action) => {
            state.wordData = { ...state.wordData, [action.payload.key]: action.payload.value };
        },
        setEditChoicesId: (state, action) => {
            state.wordData.choicesId = { ...state.wordData.choicesId, [action.payload.key]: action.payload.value };
        },
        setEditWordErrors: (state, action) => {
            state.wordErrors = { ...state.wordErrors, [action.payload.key]: action.payload.value };
        }
    }
});

export const { setEditWordData, setEditChoicesId, setEditWordErrors } = editWordSlice.actions;

export default editWordSlice.reducer;
