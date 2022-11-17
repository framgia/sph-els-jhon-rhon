import React from 'react';

import Input from '../atoms/Input';
import Error from '../atoms/Error';

const ChoiceInput = ({ value, inputType, inputName, onChange, errorMessage }) => {
    return (
        <div className='flex flex-col items-center justify-start space-y-2'>
            <div className='w-full'>
                <Input value={value} isError={(errorMessage)? true: false} inputType={inputType} inputName={inputName} onChange={onChange} />
                <Error>{errorMessage}</Error>
            </div>
        </div>
    );
}
    
export default ChoiceInput;
