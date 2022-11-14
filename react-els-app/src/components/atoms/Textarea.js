import React from "react";

const Textarea = ({ value, textareaName, onChange, isError, custStyle = '' }) => {
    const errorStyle = (isError)? 'border-red-300 outline-red-300': 'border-blue-300 outline-blue-300';

    return (
        <textarea 
            value={value}    
            name={textareaName}
            onChange={onChange}
            className={`p-2 w-full border border-solid rounded ${errorStyle} ${custStyle}`}
        />
    );
}

export default Textarea;
