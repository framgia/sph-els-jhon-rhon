import { createSlice } from "@reduxjs/toolkit";

export const userAuthenticationSlice = createSlice({
    name: 'userAuthentication',
    initialState: {
        user: {},
        isLoggedIn: false,
        token: ''
    },
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            state.token = '';
        }
    }
});

export const { loginUser, logoutUser } = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;
