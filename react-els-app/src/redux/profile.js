import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {
            id: '',
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
        },
        profileError: {
            header: ''
        },
        isFollowing: false
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
        setFollowing: (state, action) => {
            state.isFollowing = action.payload;
        },
        setProfileError: (state, action) => {
            state.profileError = {...state.profileError, [action.payload.key]: action.payload.value};
        }
    }
});

export const { setProfile, setFollows, setLearned, setFollowing, setProfileError } = profileSlice.actions;

export default profileSlice.reducer;
