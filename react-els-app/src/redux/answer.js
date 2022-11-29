import { createSlice } from '@reduxjs/toolkit';

export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        current: null,
        answerData: {},
        completed: false
    },
    reducers: {
        initializeAnswer: (state, action) => {
            state.answerData = action.payload
        },
        setAnswerData: (state, action) => {
            state.answerData[action.payload.key] = action.payload.value;
        },
        setAnswerCurrent: (state, action) => {
            state.current = action.payload;
        },
        setAnswerComplete: (state) => {
            state.completed = true;
        }
    }
});

export const { initializeAnswer, setAnswerData, setAnswerCurrent, setAnswerComplete } = answerSlice.actions;

export default answerSlice.reducer;
