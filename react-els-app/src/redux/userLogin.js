import { createSlice } from "@reduxjs/toolkit";

export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        loginData: {
            email: '',
            password: ''
        },
        loginErrors: {
            email: '',
            password: '',
            header: ''
        }
    },
    reducers: {
        setLoginData: (state, action) => {
            state.loginData = { ...state.loginData, [action.payload.key]: action.payload.value }
        },
        setLoginErrors: (state, action) => {
            state.loginErrors = { ...state.loginErrors, [action.payload.key]: action.payload.value };
        }
    }
});

export const { setLoginData, setLoginErrors } = userLoginSlice.actions;

export default userLoginSlice.reducer;
