import React from 'react';

const DefaultButton = ({ children, btnType, custStyle = '', disable = false }) => {
    const disableStyle = (disable)? 'bg-blue-400': 'bg-blue-500 hover:bg-blue-700 focus:outline focus:outline-blue-500';
    return (
       <button 
       type={`${btnType}`}
       disabled={disable}
       className={`py-2 px-4 rounded-md text-white ${disableStyle} ${custStyle}`}
       >
           {children}
       </button>
   );
}

export default DefaultButton;
