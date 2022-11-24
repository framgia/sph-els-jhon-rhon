import { createSlice } from '@reduxjs/toolkit';

export const deleteWordSlice = createSlice({
    name: 'deleteWord',
    initialState: {
        deleteKey: '',
        deleteError: ''
    },
    reducers: {
        deleteWordKey: (state, action) => {
            state.deleteKey = action.payload;
        },
        deleteWordError: (state, action) => {
            state.deleteError = action.payload;
        }   
    }
});

export const { deleteWordKey, deleteWordError } = deleteWordSlice.actions;

export default deleteWordSlice.reducer;
