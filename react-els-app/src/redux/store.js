import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
    } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userRegisterReducer from './userRegister';
import userLoginReducer from './userLogin';
import userAuthenticationReducer from './userAuthentication';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const combinedReducer = combineReducers({
    userAuthentication: userAuthenticationReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore ({
    reducer: {
        userRegister: userRegisterReducer,
        userLogin: userLoginReducer,
        persist: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
});

export const persistor = persistStore(store);
