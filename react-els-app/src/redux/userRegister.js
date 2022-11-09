import { createSlice } from "@reduxjs/toolkit";

export const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState: {
        registerData: {
            fname: '',
            lname: '',
            email: '',
            password: ''
        },
        registerErrors: {
            fname: '',
            lname: '',
            email: '',
            password: '',
            header: ''
        }
    },
    reducers: {
        setRegisterData: (state, action) => {
            state.registerData = { ...state.registerData, [action.payload.key]: action.payload.value }
        },
        setRegisterErrors: (state, action) => {
            state.registerErrors = { ...state.registerErrors, [action.payload.key]: action.payload.value };
        }
    }
});

export const { setRegisterData, setRegisterErrors } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
