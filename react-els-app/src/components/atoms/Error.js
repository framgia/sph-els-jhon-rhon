import React from 'react';

const Error = ({ children }) => {
    if(children){
        return (
            <div className='text-red-500 text-sm'>
                { children }
            </div>
        );
    }
}

export default Error;
