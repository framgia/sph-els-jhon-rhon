import React from 'react';

const HeaderError = ({ children, isError }) => {
    if(children) {
        return (
            <div className='font-medium text-red-500 text-md p-2 text-center bg-red-100 bg-transparent rounded-sm'>
                { children }
            </div>
        );
    }    
}

export default HeaderError;
