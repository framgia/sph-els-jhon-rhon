import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {
            fname: '',
            lname: '',
            email: ''
        },
        follows: {
            followers: 0,
            following: 0
        },
        learned: {
            words: 0,
            lessons: 0
        }
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setFollows: (state, action) => {
            state.follows = action.payload;
        },
        setLearned: (state, action) => {
            state.learned = action.payload;
        },
    }
});

export const { setProfile, setFollows, setLearned } = profileSlice.actions;

export default profileSlice.reducer;
