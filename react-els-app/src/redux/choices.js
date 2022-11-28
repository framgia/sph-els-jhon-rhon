import { createSlice } from '@reduxjs/toolkit';

export const choicesSlice = createSlice({
    name: 'choices',
    initialState: {
        choices: {}
    },
    reducers: {
        setChoices: (state, action) => {
            state.choices = action.payload;
        }
    }
});

export const { setChoices } = choicesSlice.actions;

export default choicesSlice.reducer;
