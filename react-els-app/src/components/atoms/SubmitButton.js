import React from 'react';

const SubmitButton = ({ buttonText, custStyle = '', bgColor = '' }) => {
    bgColor = (bgColor)? bgColor: 'bg-blue-500 hover:bg-blue-700 focus:outline-blue-500';

    return (
       <button 
       type='submit'
       className={`py-3 px-6 rounded-md text-white w-full rounded-md focus:outline ${bgColor} ${custStyle}`}
       >
           {buttonText}
       </button>
   );
}

export default SubmitButton;
