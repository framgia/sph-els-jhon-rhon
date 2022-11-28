import React from 'react';

import LessonsFooter from '../molecules/LessonsFooter';

const LessonCard = ({ title, description, to, disable = false, completed, results = '' }) => {    
    return (
        <div className='w-full h-72 flex flex-col px-3 py-3 space-y-2 items-center border p-2 rounded border border-blue-200 shadow shadow-blue-100'>
            <div className='w-full mt-2 text-lg font-semibold'>
                {title}
            </div>
            <div className='w-full h-full overflow-auto font-light'>
                {description}
            </div>
            <LessonsFooter to={to} completed={completed} results={results} disable={disable} />
        </div>
    );
}

export default LessonCard;
