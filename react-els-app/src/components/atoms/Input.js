import React from 'react';

export const Input = ({ value, inputType, inputName, onChange, isError }) => {
    const errorStyle = (isError)? 'border-red-300 outline-red-300': 'border-blue-300 outline-blue-300';

    return (
        <input 
            value={value} 
            onChange={onChange} 
            type={inputType} 
            name={inputName} 
            className={`p-2 w-full border border-solid rounded ${errorStyle}`}
        ></input>
    );
}

export default Input;
