import React from 'react';

const LinkButton = ({ children, onClick, custStyle = '' }) => {
    return (
        <div className={`cursor-pointer ${custStyle}`} onClick={onClick}>
            {children}
        </div>
    );
}

export default LinkButton;
