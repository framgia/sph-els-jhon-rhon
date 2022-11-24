import { map, range } from 'lodash';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Pagination = ({ paginateData }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const notDisable = 'text-gray-500 cursor-pointer hover:text-gray-900';
    const isDisable = 'bg-slate-50 text-gray-500 border-slate-200';

    const prevPage = () => {
        if(paginateData.current_page > 1) {
            navigate(`${location.pathname}?page=${paginateData.current_page-1}`, { replace: true });
        }   
    }
    const nextPage = () => {
        if(paginateData.last_page > paginateData.current_page) {
            navigate(`${location.pathname}?page=${paginateData.current_page+1}`, { replace: true });
        }   
    }
    const numberClick = (number) => {
        navigate(`${location.pathname}?page=${number}`, { replace: true });
    }
    if(!(paginateData.last_page === 1)) {
        return (
            <div className='flex flex-row justify-center'>
                <div className='flex flex-row my-5'>
                    <div onClick={prevPage} className={`${(paginateData.current_page === 1)? isDisable: notDisable } flex items-center px-3 py-1 border-y border-x border-blue-200 rounded-tl-full rounded-bl-full`}>
                        <svg className='w-5 h-5' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                            <path fillRule='evenodd' d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z' clipRule='evenodd' />
                        </svg>
                    </div>
                    {
                        map(range(paginateData.last_page), function(value, key) {
                            value += 1;
                            const currentStyle = (paginateData.current_page === value)? 'bg-blue-100' : 'hidden lg:block';
    
                            return(
                                <div key={value} onClick={() => numberClick(value)} className={`${currentStyle} px-3 w-11 text-center items-center py-1 border-y border-r cursor-pointer border-blue-200 text-gray-500 hover:text-gray-900 hover:font-semibold`}>{value}</div>
                            );
                        })
                    }
                    <div onClick={nextPage} className={`${(paginateData.last_page === paginateData.current_page)? isDisable: notDisable } flex items-center px-3 py-1 border-y border-r border-blue-200 rounded-tr-full rounded-br-full`}>
                        <svg className='w-5 h-5' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                            <path fillRule='evenodd' d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z' clipRule='evenodd' />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pagination;
