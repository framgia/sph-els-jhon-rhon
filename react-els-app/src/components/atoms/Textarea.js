import React from "react";

const Textarea = ({ textareaName }) => {
    return (
        <textarea 
            name={textareaName}
            className='p-2 w-full border border-blue-300 border-solid rounded outline-blue-300'
        />
    );
}

export default Textarea;
