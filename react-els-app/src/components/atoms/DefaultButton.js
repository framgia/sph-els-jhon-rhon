import React from 'react';

const DefaultButton = ({ children, btnType, custStyle = '' }) => {
    return (
       <button 
       type={`${btnType}`}
       className={`py-2 px-4 rounded-md text-white rounded-sm bg-blue-500 hover:bg-blue-700 focus:outline focus:outline-blue-500 ${custStyle}`}
       >
           {children}
       </button>
   );
}

export default DefaultButton;
