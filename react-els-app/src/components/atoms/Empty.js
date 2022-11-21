import React from 'react';

const Empty = ({ children, data }) => {
    if(data.length === 0) {
        return (
            <div className='w-full'>
                {children}
            </div>
        );
    }
}

export default Empty;
