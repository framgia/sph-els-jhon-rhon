import { configureStore } from '@reduxjs/toolkit';

import userRegisterReducer from './userRegister';

export const store = configureStore ({
    reducer: {
        userRegister: userRegisterReducer
    }
});
