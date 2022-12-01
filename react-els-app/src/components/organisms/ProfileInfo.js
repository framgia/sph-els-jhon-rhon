import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from '../../api/axios';
import { setLearned, setProfile } from '../../redux/profile';
import { Imports } from '../templates/Imports';

const ProfileInfo = ({id}) => {
    const imports = Imports();
    const { profile, follows, learned } = useSelector(state => state.profile);

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
            console.log(error.response);
        }
    }

    useEffect(() => {
        fethProfile();
    }, [imports.dispatch]);

    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='divide-y divide-blue-300'>
                <div className='w-full flex flex-col items-center gap-3'>
                    <div className='flex w-28 h-28 items-center border border-blue-300 justify-center'>
                        <div>Image</div>
                    </div>
                    <div className='font-semibold text-center mb-3'>{profile.fname} {profile.lname}</div>
                </div>
                <div className='w-full flex flex-row items-center py-3 text-center text-sm'>
                    <div className='w-1/2 flex flex-col'>
                        <div className='w-full'>{follows.followers}</div>
                        <div className='w-full'>followers</div>
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <div className='w-full'>{follows.following}</div>
                        <div className='w-full'>following</div>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col gap-1 items-center'>
                <div className='text-sm'>Learned {learned.words} words</div>
                <div className='text-sm'>Learned {learned.lessons} lessons</div>
            </div>
        </div>
    );
}

export default ProfileInfo;
