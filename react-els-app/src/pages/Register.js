import React, { useContext } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useSelector, useDispatch } from 'react-redux'

import AuthInput from '../components/molecules/AuthInput';
import SubmitButton from '../components/atoms/SubmitButton';
import FormTemplate from '../components/templates/FormTemplate';
import HeaderError from '../components/atoms/HeaderError';
import { setRegisterData, setRegisterErrors } from '../redux/userRegister';

const Register = () => {
    const { registerData, registerErrors } = useSelector(state => state.userRegister);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/register', registerData);

            //console.log(response);

            navigate('/', { replace : true });
            
        } 
        catch (error) {
            dispatch(setRegisterData({key: 'password', value: ''}));
            _.map(registerErrors, function(value, key){
                dispatch(setRegisterErrors({key, value: ''}));
            });

            if(error.response.status === 400) {
                _.map(error.response.data.errors, function(value, key){
                    dispatch(setRegisterErrors({key, value}));
                });
                return;
            }
            if(error.response.status === 500) {
                dispatch(setRegisterErrors({key: 'header', value: 'No response from the server'}));
                return;
            }

            dispatch(setRegisterErrors({key: 'header', value: 'Registration Failed'}));
        } 
    }

    return (
        <section>
            <FormTemplate onSubmit={onSubmit} formHeader='Register'>
                <HeaderError>{registerErrors.header}</HeaderError>
                <AuthInput inputLabel='First Name' value={registerData.fname} inputType='text' onChange={(e) => dispatch(setRegisterData({key: 'fname', value: e.target.value}))} inputName='fname' errorMessage={registerErrors.fname}/>
                <AuthInput inputLabel='Last Name' value={registerData.lname} inputType='text' onChange={(e) => dispatch(setRegisterData({key: 'lname', value: e.target.value}))} inputName='lname' errorMessage={registerErrors.lname}/>
                <AuthInput inputLabel='Email' value={registerData.email} inputType='email' onChange={(e) => dispatch(setRegisterData({key: 'email', value: e.target.value}))} inputName='email' errorMessage={registerErrors.email}/>
                <AuthInput inputLabel='Password' value={registerData.password} inputType='password' onChange={(e) => dispatch(setRegisterData({key: 'password', value: e.target.value}))} inputName='password' errorMessage={registerErrors.password}/>
                <div className='flex justify-end pt-5'>
                    <SubmitButton buttonText='Submit' />
                </div>
            </FormTemplate>
        </section>
    );
}

export default Register;
