import React from 'react';
import { Link } from 'react-router-dom';
import DefaultButton from '../atoms/DefaultButton';
import WhiteButton from '../atoms/WhiteButton';

const LessonsFooter = ({to, results, completed, disable}) => {
    if(completed) {
        return (
            <div className='w-full flex justify-between items-center'>
                <Link to={results}>
                    <WhiteButton btnType='button' custStyle='text-sm text-blue-600'>Results</WhiteButton>
                </Link>
                <div className='text-sm px-2'>
                    Completed
                </div>
            </div>
        );
    }

    return (
        <div className='w-full flex justify-end'>
            <Link to={to}>
                <DefaultButton btnType='button' disable={disable} custStyle='text-sm'>Start Lesson</DefaultButton>
            </Link>
        </div>
    );
}

export default LessonsFooter;
