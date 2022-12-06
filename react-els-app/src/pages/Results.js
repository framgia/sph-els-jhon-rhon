import { find, map } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from '../api/axios';
import CheckIcon from '../components/atoms/CheckIcon';
import Section from '../components/atoms/Section';
import WrongIcon from '../components/atoms/WrongIcon';
import BackButton from '../components/molecules/BackButton';
import PageError from '../components/organisms/PageError';
import { Imports } from '../components/templates/Imports';
import SetError from '../components/templates/SetError';
import { setResultsData, setResultsError } from '../redux/results';

const Results = () => {
    const imports = Imports();
    const { resultsData, resultsError } = useSelector(state => state.results);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const fetchResults = async () => {
        try {
            const response = await axios.get(`/categories/${imports.params.id}/results`, axiosConfig);
            
            imports.dispatch(setResultsData(response.data));
        }
        catch(error) {
            SetError(imports.dispatch, setResultsError, error.response.status);
        }
    }

    useEffect(() => {
        fetchResults();
    }, [imports.dispatch, imports.location]);

    if(resultsError.header || (resultsData.length === 0)) {
        return <PageError>{resultsError.header? resultsError.header : 'No results to show'}</PageError>
    }

    return (
        <Section>
            <div className='flex flex-col w-full lg:w-2/5 mx-auto mt-4'>
                <div className='flex flex-row w-full justify-between'>
                    <BackButton />
                </div>
                <div className='w-full mt-6 divide-y-2 divide-blue-200'>
                    <div className='flex w-full flex-row justify-between py-4 text-xl'>
                        <div className='font-semibold '>{resultsData.lesson.title}</div>
                        <div className='flex flex-row gap-2'>Results: <div className='font-light'>{resultsData.results.score}/{resultsData.results.total}</div></div>
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                        <div className='flex flex-row w-full mt-2 items-center'>
                            <div className='flex flex-col items-center w-full'>
                                
                            </div>
                            <div className='flex flex-col items-center w-full'>
                                <div className='font-bold'>Word</div>
                            </div>
                            <div className='flex flex-col items-center w-full'>
                                <div className='font-bold'>Answer</div>
                            </div>
                        </div>
                        {
                            map(resultsData.words, function(value, key) {
                                const showIcon = (find(resultsData.answers, ['words_id', value.id]).answer)? <CheckIcon /> : <WrongIcon />;
                                return (
                                    <div key={key} className='flex flex-row w-full items-center'>
                                        <div className='flex flex-col items-center w-full'>
                                            {showIcon}
                                        </div>
                                        <div className='flex flex-col items-center w-full'>
                                            <div>{value.word}</div>
                                        </div>
                                        <div className='flex flex-col items-center w-full'>
                                            <div>{find(resultsData.answers, ['words_id', value.id]).choice}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Results;
