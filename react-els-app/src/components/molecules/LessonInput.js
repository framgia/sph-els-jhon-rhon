import React from 'react';

import Input from '../atoms/Input';
import Error from '../atoms/Error';

const LessonInput = ({ value, inputLabel, inputType, inputName, onChange, errorMessage }) => {
    return (
        <div className='flex flex-col items-center justify-start space-y-2 py-2'>
            <label className='text-lg w-full'>{inputLabel}</label>
            <div className='w-full'>
                <Input value={value} isError={(errorMessage)? true: false} inputType={inputType} inputName={inputName} onChange={onChange} />
                <Error>{errorMessage}</Error>
            </div>
        </div>
    );
}
    
export default LessonInput;
