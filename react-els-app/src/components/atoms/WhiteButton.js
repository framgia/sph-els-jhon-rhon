import React from "react";

const WhiteButton = ({ children, btnType, onClick, custStyle = '' }) => {
    return (
        <button 
       type={`${btnType}`}
       onClick={onClick}
       className={`py-2 px-4 rounded-md rounded-md outline outline-1 outline-blue-500 hover:bg-blue-300 hover:text-white focus:text-white focus:bg-blue-500 focus:outline-2 focus:outline-blue-500 ${custStyle}`}
       >
           {children}
       </button>
    );
}

export default WhiteButton;
