import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AuthInput from '../components/molecules/AuthInput';
import SubmitButton from '../components/atoms/SubmitButton';
import FormTemplate from '../components/templates/FormTemplate';
import HeaderError from '../components/atoms/HeaderError';
import AuthContext from '../context/AuthProvider';

const Register = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [data, setData] = useState({
        'fname': '',
        'lname': '',
        'email': '',
        'password': ''
    });
    const [errors, setErrors] = useState({
        'serverError': '',
        'fname': '',
        'lname': '',
        'email': '',
        'password': ''
    });
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/register', data);

            //console.log(response.data);

            if(response.data.status === 400) {
                setData({...data, password: ''});
                setErrors(response.data.errors);
            } else if ( response.data.status === 200 ) {
                setAuth({...auth,
                    isSignedIn: true,
                    fname: response.data.fname,
                    lname: response.data.lname, 
                    email: response.data.email
                });
                navigate('/', { replace : true });
            }
            
        } catch (err) {
            setErrors({...errors, serverError: 'Registration Failed'});
        }

    }

    return (
        <section>
            <FormTemplate onSubmit={onSubmit} formHeader='Register'>
                <HeaderError>{errors.serverError}</HeaderError>
                <AuthInput inputLabel='First Name' value={data.fname} onChange={(e) => setData({...data, fname: e.target.value})} inputType='text' inputName='fname' errorMessage={errors.fname}/>
                <AuthInput inputLabel='Last Name' value={data.lname} onChange={(e) => setData({...data, lname: e.target.value})} inputType='text' inputName='lname' errorMessage={errors.lname}/>
                <AuthInput inputLabel='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} inputType='email' inputName='email' errorMessage={errors.email}/>
                <AuthInput inputLabel='Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} inputType='password' inputName='password' errorMessage={errors.password}/>
                <div className='flex justify-end pt-5'>
                    <SubmitButton buttonText='Submit' />
                </div>
            </FormTemplate>
        </section>
    );
}

export default Register;
