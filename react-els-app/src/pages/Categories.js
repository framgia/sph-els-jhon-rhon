import { find, findKey, map } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from '../api/axios';
import Empty from '../components/atoms/Empty';
import LessonCard from '../components/atoms/LessonCard';
import Section from '../components/atoms/Section';
import BackButton from '../components/molecules/BackButton';
import PageError from '../components/organisms/PageError';
import Pagination from '../components/organisms/Pagination';
import FetchLessons from '../components/templates/FetchLessons';
import { Imports } from '../components/templates/Imports';
import { setLessonsError, setLessonsWord } from '../redux/lessons';


const Categories = () => {
    const imports = Imports();
    const { lessonsData, lessonsError, lessonsWord } = useSelector(state => state.lessons);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const allWordsCount = async () => {
        try {
            const response = await axios.get(`/categories/words`, axiosConfig);
            const lessons = {};
            
            map(lessonsData, function(value) {
                lessons[value.id] = 0;
            });

            map(response.data, function(value) {
                if(value.lessons_id in lessons){
                    lessons[value.lessons_id] += 1;
                }
            });

            imports.dispatch(setLessonsWord(lessons));
        }
        catch(error) {
            imports.dispatch(setLessonsError());
        }
    }

    useEffect(() => {
        FetchLessons(imports.dispatch, imports.token, imports.location, imports.searchParams, imports.navigate);
    }, [imports.dispatch, imports.location]);

    useEffect(() => {
        allWordsCount();
    }, [imports.dispatch, lessonsData]);

    if(lessonsError) {
        return <PageError>{lessonsError}</PageError>
    }   

    return (
        <Section>
            <div className='flex flex-col w-full lg:w-1/2 mx-auto mt-4'>
                <div className='flex flex-row w-full justify-between'>
                    <BackButton />
                </div>
                <div className='flex flex-col mt-4 divide-y-2 divide-blue-200'>
                    <div className='w-full py-4 font-semibold text-xl'>
                        Categories
                    </div>
                    <div className='grid grid-cols-1 gap-10 justify-items-center lg:grid-cols-2 py-4'>
                        {
                            map(lessonsData, function(value, key) {
                                return (
                                    <React.Fragment key={key}>
                                        <LessonCard title={value.title} description={value.description} disable={(lessonsWord[value.id] < 2)} to={`/categories/${value.id}`} />
                                    </React.Fragment>
                                );
                            })
                        }
                        <Empty data={lessonsData}>
                            <div className='w-full'>No Lessons to show...</div>
                        </Empty>
                    </div>
                </div>
                <Pagination paginateData={imports.paginateData}/>
            </div>
        </Section>
    );
}

export default Categories;
