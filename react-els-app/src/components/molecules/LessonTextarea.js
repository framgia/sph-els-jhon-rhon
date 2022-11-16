import React from 'react';

import Error from '../atoms/Error';
import Textarea from '../atoms/Textarea';

const LessonTextarea = ({ value, textareaLabel , textareaName, onChange, errorMessage }) => {
    return (
        <div className='flex flex-col items-center justify-start space-y-2 py-2'>
            <label className='text-lg w-full'>{textareaLabel}</label>
            <div className='w-full'>
                <Textarea 
                    value={value} 
                    isError={(errorMessage)? true: false}
                    textareaName={textareaName} 
                    onChange={onChange} />
                <Error>{errorMessage}</Error>
            </div>
        </div>
    );
}
    
export default LessonTextarea;
