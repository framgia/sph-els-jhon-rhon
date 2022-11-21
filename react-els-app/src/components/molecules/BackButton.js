import React from 'react';
import { useNavigate } from 'react-router-dom';
import LinkButton from '../atoms/LinkButton';

const BackButton = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1);
    }

    return (
        <LinkButton onClick={onClick} custStyle='w-6' >
            <svg 
                className='cursor-pointer fill-gray-500 hover:fill-gray-900 w-6 h-6'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
            >
                <path fillRule='evenodd' d='M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z' clipRule='evenodd' />
            </svg>
        </LinkButton>
    );
}

export default BackButton;
