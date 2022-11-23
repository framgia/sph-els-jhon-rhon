import React from 'react';
import { Link } from 'react-router-dom';
import DefaultButton from './DefaultButton';

const LessonCard = ({ title, description, to }) => {
    return (
        <div className='w-full h-72 flex flex-col px-3 py-3 space-y-2 items-center border p-2 rounded border border-blue-200 shadow shadow-blue-100'>
            <div className='w-full mt-2 text-center text-lg font-semibold'>
                {title}
            </div>
            <div className='w-full h-full overflow-auto font-light'>
                {description}
            </div>
            <div className='w-full flex justify-end'>
                <Link to={to}>
                    <DefaultButton btnType='button' custStyle='text-sm'>Start Lesson</DefaultButton>
                </Link>
            </div>
        </div>
    );
}

export default LessonCard;
