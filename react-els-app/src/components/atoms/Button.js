import React from 'react';

const Button = ({ children, type='default', onClick, title = ''}) => {
    let buttonStyle = '';
    let disabled = false;
    let btnType = 'button';
    switch(type) {
        case('follow'): 
            buttonStyle = 'w-40 rounded-full py-1 text-blue-700 outline outline-1 outline-blue-500 hover:bg-blue-300 hover:text-white'; 
            break;
        case('following'): 
            buttonStyle = 'w-40 rounded-full py-1 text-white bg-blue-500 outline outline-1 outline-blue-500 hover:bg-blue-400 hover:outline-blue-400';
            break;
        case('edit-profile'):
            buttonStyle = 'absolute static -right-3 -top-3 z-10';
            break;
        default:
            buttonStyle = 'py-2 px-4 rounded-md text-blue-600 outline outline-1 outline-blue-500 hover:outline-0 hover:bg-blue-300 hover:text-white';
            break;
    }
    
    return (
        <button 
       type={btnType}
       onClick={onClick}
       disabled={disabled}
       className={buttonStyle}
       title={title}
       >
           {children}
       </button>
    );
}

export default Button;
