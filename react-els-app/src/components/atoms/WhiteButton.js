import React from "react";

const WhiteButton = ({ children, btnType, custStyle = '' }) => {
    return (
        <button 
       type={`${btnType}`}
       className={`py-2 px-4 rounded-md rounded-md outline outline-1 outline-blue-500 hover:bg-blue-300 hover:text-white focus:bg-blue-300 focus:outline-2 focus:outline-blue-500 ${custStyle}`}
       >
           {children}
       </button>
    );
}

export default WhiteButton;
