import React, { useState } from 'react';

import axios from '../../api/axios';
import Button from '../atoms/Button';
import HeaderError from '../atoms/HeaderError';
import Icons from '../atoms/Icons';
import LessonInput from '../molecules/LessonInput';
import { Imports } from '../templates/Imports';
import { errorList } from '../utils/errorList';
import ModalForm from './ModalForm';

const EditProfile = ({id}) => {
    const imports = Imports();
    const profileInit = {fname: '', lname: ''};
    const [ isOpen, setIsOpen ] = useState(false);
    const [ editProfile, setEditProfile ] = useState(profileInit);
    const [ editProfileError, setEditProfileError ] = useState({});

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get(`profile/${id}/edit`, axiosConfig);
            
            setEditProfile({
                'fname': response.data.fname,
                'lname': response.data.lname,
            }); 
        }
        catch(error) {
            setEditProfileError({header: errorList(error.response.status)});
        }
    }

    const onClickEditProfile = () => {
        fetchUser();
        setIsOpen(true);
    }

    const submitEditProfile = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`profile/${id}/update`, editProfile, axiosConfig);

            setIsOpen(false);
            setEditProfile({profileInit});
            window.location.reload();
        }
        catch(error) {
            console.log(error.response);
            if(error.response.status === 400) {
                setEditProfileError(error.response.data.errors);
                return;
            }
            setEditProfileError({header: errorList(error.response.status)});
        }
    }

    return (
        <React.Fragment>
            <Button onClick={onClickEditProfile} title='Edit Profile' type='edit-profile'><Icons name='edit-pen' size='w-7 h-7' /></Button>
        
            <ModalForm isOpen={isOpen} onSubmit={(event) => submitEditProfile(event)} onClose={() => setIsOpen(false)} modalHeader='Edit Profile' submitText='Submit' btnBgColor='bg-blue-400 hover:bg-blue-500 focus:outline-blue-500'>
                <HeaderError>{editProfileError.header}</HeaderError>
                <LessonInput value={editProfile.fname} onChange={(e) => setEditProfile({...editProfile, fname: e.target.value})} errorMessage={editProfileError.fname} inputType='text' inputName='fname' inputLabel='First Name' />
                <LessonInput value={editProfile.lname} onChange={(e) => setEditProfile({...editProfile, lname: e.target.value})} errorMessage={editProfileError.lname} inputType='text' inputName='lname' inputLabel='Last Name' />
            </ModalForm>
        </React.Fragment>
    );
}

export default EditProfile;
