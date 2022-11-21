import React from 'react';
import { useNavigate } from 'react-router-dom';
import LinkButton from '../atoms/LinkButton';

const BackButton = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1);
    }

    return (
        <LinkButton onClick={onClick}>  
            <svg 
                className='cursor-pointer fill-gray-500 hover:fill-gray-900'
                xmlns='http://www.w3.org/2000/svg'
                width='35'
                height='35'
                viewBox='0 0 16 16'
            >
                <path fillRule='evenodd' d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z'/>
            </svg>
        </LinkButton>
    );
}

export default BackButton;
