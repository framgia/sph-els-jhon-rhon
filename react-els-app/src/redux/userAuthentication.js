import { createSlice } from "@reduxjs/toolkit";

export const userAuthenticationSlice = createSlice({
    name: 'userAuthentication',
    initialState: {
        user: {},
        isLoggedIn: false
    },
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        }
    }
});

export const { loginUser } = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;
