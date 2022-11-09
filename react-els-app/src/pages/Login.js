import React from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { useSelector, useDispatch } from 'react-redux'
import _ from "lodash";

import FormTemplate from "../components/templates/FormTemplate";
import AuthInput from "../components/molecules/AuthInput";
import SubmitButton from "../components/atoms/SubmitButton";
import HeaderError from "../components/atoms/HeaderError";
import { setLoginData, setLoginErrors } from "../redux/userLogin";

const Login = () => {
    const { loginData, loginErrors } = useSelector(state => state.userLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/login', loginData);

            console.log(response);

            navigate('/', { replace: true });
        } 
        catch (error) {
            dispatch(setLoginData({key: 'password', value: ''}));
            _.map(loginErrors, function(value, key){
                dispatch(setLoginErrors({key, value: ''}));
            });

            console.log(error.response.data.errors);

            if( error.response.status === 400 ) {
                _.map(error.response.data.errors, function(value, key){
                    dispatch(setLoginErrors({key, value}));
                });
                return;
            }

            if( error.response.status === 401 ) {
                _.map(error.response.data.errors, function(value, key){
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
        <section>
            <FormTemplate onSubmit={onSubmit} formHeader='Log-in'>
                <HeaderError>{loginErrors.header}</HeaderError>
                <AuthInput inputLabel='Email' value={loginData.email} onChange={(e) => dispatch(setLoginData({key: 'email', value: e.target.value}))} errorMessage={loginErrors.email} inputType='email' inputName='email'/>
                <AuthInput inputLabel='Password' value={loginData.password} onChange={(e) => dispatch(setLoginData({key: 'password', value: e.target.value}))} errorMessage={loginErrors.password} inputType='password' inputName='password'/>
                <div className='flex justify-end pt-5'>
                    <SubmitButton buttonText='Login' />
                </div>
            </FormTemplate>
        </section>
    );
}

export default Login;
