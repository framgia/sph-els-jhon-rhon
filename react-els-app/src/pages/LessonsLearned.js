import { find, keys, map } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from '../api/axios';
import Section from '../components/atoms/Section';
import BackButton from '../components/molecules/BackButton';
import PageError from '../components/organisms/PageError';
import PagiPage from '../components/organisms/PagiPage';
import ProfileInfo from '../components/organisms/ProfileInfo';
import { Imports } from '../components/templates/Imports';
import SetError from '../components/templates/SetError';
import { setLessonsLearnedData, setLessonsLearnedError } from '../redux/lessonsLearned';
import { setPaginateData } from '../redux/paginate';

const LessonsLearned = () => {
    const imports = Imports();
    const { lessonsLearnedData, lessonsLearnedError } = useSelector(state => state.lessonsLearned);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const fetchLessons = async ( page = 0 ) => {
        const pageSearch = (page)? `?page=${page}` : '';
        try {
            const response = await axios.get(`${imports.params.id}/learned/lessons${pageSearch}`, axiosConfig);
            const lessons = response.data;

            imports.dispatch(setLessonsLearnedData(lessons.data));
            imports.dispatch(await setPaginateData({
                'current_page': lessons.current_page,
                'last_page': lessons.last_page,
                'from': lessons.from,
                'to': lessons.to,
                'per_page': lessons.per_page,
                'total': lessons.total
            }));
        }
        catch(error) {
            SetError(imports.dispatch, setLessonsLearnedError, error.response.status);
        }
    }

    const nextClick = () => {
        fetchLessons(imports.paginateData.current_page + 1);
    }

    const prevClick = () => {
        fetchLessons(imports.paginateData.current_page - 1);
    }

    const numberClick = (number) => {
        fetchLessons(number);
    }

    useEffect(() => {
        fetchLessons();
    }, [imports.dispatch]);

    if(lessonsLearnedError.header) {
        return <PageError>{lessonsLearnedError.header}</PageError>
    }

    return (
        <Section>
            <div className='flex flex-row w-full lg:w-3/5 mx-auto mt-5'>
                <BackButton />
            </div>
            <div className='flex flex-col w-full lg:w-3/5 lg:flex-row mx-auto my-10 gap-10'>
                <div className='w-full flex flex-col lg:w-1/4 gap-3'>
                    <ProfileInfo id={imports.params.id} />
                </div>
                <div className='w-full lg:w-3/4 flex flex-col'>
                    <div className='w-full border border-blue-300 rounded-sm p-5 divide-y-2 divide-blue-200'>
                        <div className='w-full flex flex-row justify-between pb-2'>
                            <div className='font-semibold text-lg'>Lessons learned</div>
                            <div>{imports.paginateData.from}-{imports.paginateData.to} of {imports.paginateData.total}</div>
                        </div>
                        <div className='w-full pt-2'>
                            <div className='w-full flex flex-col gap-2 divide-y divide-blue-100'>
                                {
                                    map(lessonsLearnedData, function(value, key) {
                                        return (
                                            <div key={key} className='w-auto py-1 lg:mx-10'>
                                                {value.title}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <PagiPage paginateData={imports.paginateData} nextClick={nextClick} prevClick={prevClick} numberClick={numberClick} />
                </div>
            </div>
        </Section>
    );
}

export default LessonsLearned;
