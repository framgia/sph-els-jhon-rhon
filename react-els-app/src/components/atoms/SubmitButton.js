import React from 'react';

const SubmitButton = ({ buttonText, custStyle = '' }) => {
    return (
       <button 
       type='submit'
       className={`py-3 px-6 rounded-md text-white w-full rounded-md bg-blue-500 hover:bg-blue-700 focus:outline focus:outline-blue-500 ${custStyle}`}
       >
           {buttonText}
       </button>
   );
}

export default SubmitButton;
