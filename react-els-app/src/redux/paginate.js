import { createSlice } from '@reduxjs/toolkit';

export const paginateSlice = createSlice({
    name: 'paginate',
    initialState: {
        paginateData: {}
    },
    reducers: {
        setPaginateData: (state, action) => {
            state.paginateData = action.payload;
        }
    }
});

export const { setPaginateData } = paginateSlice.actions;

export default paginateSlice.reducer;
