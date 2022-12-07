import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import addLessonReducer from './addLesson';
import lessonsReducer from './lessons';
import editLessonReducer from './editLesson';
import deleteLessonReducer from './deleteLesson';
import addWordReducer from './addWord';
import paginateReducer from './paginate';
import lessonReducer from './lesson';
import wordsReducer from './words';
import editWordReducer from './editWord';
import deleteWordReducer from './deleteWord';
import answerReducer from './answer';
import choicesReducer from './choices';
import resultsReducer from './results';
import lessonsCompletedReducer from './lessonsCompleted';
import profileReducer from './profile';

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
        persist: persistedReducer,
        addLesson: addLessonReducer,
        lessons: lessonsReducer,
        editLesson: editLessonReducer,
        deleteLesson: deleteLessonReducer,
        addWord: addWordReducer,
        paginate: paginateReducer,
        lesson: lessonReducer,
        words: wordsReducer,
        editWord: editWordReducer,
        deleteWord: deleteWordReducer,
        answer: answerReducer,
        choices: choicesReducer,
        results: resultsReducer,
        lessonsCompleted: lessonsCompletedReducer,
        profile: profileReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
});

export const persistor = persistStore(store);
