import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import { logoutUser } from '../../redux/userAuthentication';
import LinkButton from '../atoms/LinkButton';

const LogoutUser = ({children}) => {
    const { user, isLoggedIn, token } = useSelector(state => state.persist.userAuthentication);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const logout = async () => {
        if(isLoggedIn){
            const response = await axios.post('/logout', user, axiosConfig);

            dispatch(logoutUser());

            navigate('/login', { replace: true });
        }
    }
    
    return <LinkButton onClick={logout}>{children}</LinkButton>;
}

export default LogoutUser;
