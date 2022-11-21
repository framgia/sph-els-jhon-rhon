import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { useSelector, useDispatch } from 'react-redux'
import { map } from 'lodash';

import FormTemplate from '../components/templates/FormTemplate';
import AuthInput from '../components/molecules/AuthInput';
import SubmitButton from '../components/atoms/SubmitButton';
import HeaderError from '../components/atoms/HeaderError';
import { setLoginData, setLoginErrors } from '../redux/userLogin';
import { loginUser } from '../redux/userAuthentication';
import Section from '../components/atoms/Section';

const Login = () => {
    const { loginData, loginErrors } = useSelector(state => state.userLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/login', loginData);

            dispatch(loginUser(response.data));
            
            map(loginData, function(value, key){
                dispatch(setLoginData({key, value: ''}));
            });

            map(loginErrors, function(value, key){
                dispatch(setLoginErrors({key, value: ''}));
            });

            navigate(from, { replace: true });
        } 
        catch(error) {
            dispatch(setLoginData({key: 'password', value: ''}));
            map(loginErrors, function(value, key){
                dispatch(setLoginErrors({key, value: ''}));
            });

            if( (error.response.status === 400) || (error.response.status === 401) ) {
                map(error.response.data.errors, function(value, key){
                    dispatch(setLoginErrors({key, value}));
                });
                return;
            }

            if(error.response.status === 500) {
                dispatch(setLoginErrors({key: 'header', value: 'No response from the server'}));
                return;
            }

            dispatch(setLoginErrors({key: 'header', value: 'Log-in Failed'}));
        }
    }

    return (
        <Section>
            <FormTemplate onSubmit={onSubmit} formHeader='Log-in'>
                <HeaderError>{loginErrors.header}</HeaderError>
                <AuthInput inputLabel='Email' value={loginData.email} onChange={(e) => dispatch(setLoginData({key: 'email', value: e.target.value}))} errorMessage={loginErrors.email} inputType='email' inputName='email'/>
                <AuthInput inputLabel='Password' value={loginData.password} onChange={(e) => dispatch(setLoginData({key: 'password', value: e.target.value}))} errorMessage={loginErrors.password} inputType='password' inputName='password'/>
                <div className='flex justify-center'>
                    <SubmitButton buttonText='Login' custStyle='mt-5' />
                </div>
            </FormTemplate>
        </Section>
    );
}

export default Login;
