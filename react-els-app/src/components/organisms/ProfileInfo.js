import { capitalize } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from '../../api/axios';
import { setLearned, setProfile, setFollows, setProfileError, setFollowing } from '../../redux/profile';
import Button from '../atoms/Button';
import HeaderError from '../atoms/HeaderError';
import { Imports } from '../templates/Imports';
import SetError from '../templates/SetError';

const ProfileInfo = ({id}) => {
    const imports = Imports();
    const { profile, follows, learned, isFollowing, profileError } = useSelector(state => state.profile);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const fethProfile = async () => {
        try {
            const response = await axios.get(`/profile/${id}`, axiosConfig);

            imports.dispatch(setProfile(response.data.profile));
            imports.dispatch(setLearned(response.data.learned));
        }
        catch(error) {
            SetError(imports.dispatch, setProfileError, error.response.status);
        }
    }

    const fetchFollows = async () => {
        try {
            const response = await axios.get(`/profile/${id}/follows`, axiosConfig);

            imports.dispatch(setFollows(response.data.follows));
            imports.dispatch(setFollowing(response.data.isFollowing));
        }
        catch(error) {
            SetError(imports.dispatch, setProfileError, error.response.status);
        }
    }

    const followsClick = async () => {
        try {
            const response = await axios.post(`/profile/${id}/follow`, imports.user, axiosConfig);

            console.log(response.data);

            fetchFollows();
        }
        catch(error) {
            SetError(imports.dispatch, setProfileError, error.response.status);
        }
    }

    useEffect(() => {
        fethProfile();
    }, [imports.dispatch, imports.location]);

    useEffect(() => {
        fetchFollows();
    }, [isFollowing, imports.location]);

    if(profileError.header) {
        return <HeaderError>{profileError.header}</HeaderError>
    }

    return (
        <div className='w-full flex flex-col items-center gap-3'>
            <div className='w-full divide-y divide-blue-300'>
                <div className='w-full relative flex flex-col items-center gap-3'>
                    <div className='flex w-28 h-28 items-center border border-blue-300 justify-center'>
                        <div>Image</div>
                    </div>
                    <div className='font-semibold text-center mb-3'>{capitalize(profile.fname)} {capitalize(profile.lname)}</div>
                </div>
                <div className='w-full flex flex-col items-center py-3 gap-3'>
                    <div className='w-full flex flex-row gap-10 justify-center text-center text-sm'>
                        <div className='w-auto flex flex-col'>
                            <div className='w-full'>{follows.followers}</div>
                            <div className='w-full'>followers</div>
                        </div>
                        <div className='w-auto flex flex-col'>
                            <div className='w-full'>{follows.following}</div>
                            <div className='w-full'>following</div>
                        </div>
                    </div>
                    { (profile.id !== imports.user.id) &&
                        <Button type={(isFollowing)? 'following': 'follow'} onClick={followsClick}>{(isFollowing)? 'Following': 'Follow'}</Button>
                    }
                </div>
            </div>
            <div className='w-full flex flex-col gap-1 items-center text-sm'>
                    <Link to={`/${profile.id}/learned/words`} className={`${learned.words === 0? 'pointer-events-none': ''} text-blue-600 hover:underline`}>Learned {learned.words} words</Link>
                    <Link to={`/${profile.id}/learned/lessons`} className={`${learned.lessons === 0? 'pointer-events-none': ''} text-blue-600 hover:underline`}>Learned {learned.lessons} lessons</Link>
            </div>
        </div>
    );
}

export default ProfileInfo;
