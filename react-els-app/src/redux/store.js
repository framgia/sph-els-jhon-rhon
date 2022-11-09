import { configureStore } from '@reduxjs/toolkit';

import userRegisterReducer from './userRegister';
import userLoginReducer from './userLogin';

export const store = configureStore ({
    reducer: {
        userRegister: userRegisterReducer,
        userLogin: userLoginReducer
    }
});
