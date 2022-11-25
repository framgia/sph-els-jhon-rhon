import { map } from 'lodash';
import React, { useEffect } from 'react';

import axios from '../api/axios';
import Empty from '../components/atoms/Empty';
import LessonCard from '../components/atoms/LessonCard';
import Section from '../components/atoms/Section';
import BackButton from '../components/molecules/BackButton';
import PageError from '../components/organisms/PageError';
import Pagination from '../components/organisms/Pagination';
import FetchLessons from '../components/templates/FetchLessons';
import { Imports } from '../components/templates/Imports';


const Categories = () => {
    const imports = Imports();

    useEffect(() => {
        FetchLessons(imports.dispatch, imports.token, imports.location, imports.searchParams, imports.navigate);
    }, [imports.dispatch, imports.location]);

    if(imports.lessonsError) {
        return <PageError>{imports.lessonsError}</PageError>
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
                            map(imports.lessonsData, function(value, key) {
                                return <LessonCard title={value.title} description={value.description} to='' />
                            })
                        }
                        <Empty data={imports.lessonsData}>
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
