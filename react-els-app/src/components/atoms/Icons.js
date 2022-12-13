import React from 'react';

const Icons = ({name, size = 'w-6 h-6'}) => {
    let IconPath = '';
    let iconClass = '';

    switch(name) {
        case('edit-pen'):
            iconClass = 'stroke-blue-500 fill-white hover:fill-blue-300 hover:stroke-blue-800'
            IconPath = <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125' />
            break;       
        default:
            IconPath = <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            break;
    }

    return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`${size} ${iconClass}`}>
            {IconPath}
        </svg>
    );
}

export default Icons;
