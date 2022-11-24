import { createSlice } from '@reduxjs/toolkit';

export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        current: null,
        answerData: {},
    },
    reducers: {
        setAnswerData: (state, action) => {
            state.answerData = { ...state.answerData, [action.payload.key] : [action.payload.value] };
        },
        setAnswerCurrent: (state, action) => {
            state.current = action.payload;
        }
    }
});

export const { setAnswerData, setAnswerCurrent } = answerSlice.actions;

export default answerSlice.reducer;
