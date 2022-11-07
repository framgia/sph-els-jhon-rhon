import React from 'react';
import Input from '../atoms/Input';
import Error from '../atoms/Error';

const AuthInput = ({ value, inputLabel, inputType, inputName, onChange, errorMessage }) => {
    return (
        <div className='flex flex-row items-center justify-between space-x-6 py-2'>
            <label className='text-end w-60'>{inputLabel}</label>
            <div className='w-full'>
                <Input value={value} isError={(errorMessage)? true: false} inputType={inputType} inputName={inputName} onChange={onChange} />
                <Error>{errorMessage}</Error>
            </div>
        </div>
    );
}
    
export default AuthInput;
