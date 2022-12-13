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
import { setPaginateData } from '../redux/paginate';
import { setWordsLearnedData, setWordsLearnedError } from '../redux/wordsLearned';

const WordsLearned = () => {
    const imports = Imports();
    const { wordsLearnedData, wordsLearnedError } = useSelector(state => state.wordsLearned);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const fetchWords = async ( page = 0 ) => {
        const pageSearch = (page)? `?page=${page}` : '';
        try {
            const response = await axios.get(`${imports.params.id}/learned/words${pageSearch}`, axiosConfig);
            const answers = response.data.answers;
            const words = response.data.words;

            imports.dispatch(setWordsLearnedData({key: 'words', value: words}));
            imports.dispatch(setWordsLearnedData({key: 'answers', value: answers.data}));
            imports.dispatch(await setPaginateData({
                'current_page': answers.current_page,
                'last_page': answers.last_page,
                'from': answers.from,
                'to': answers.to,
                'per_page': answers.per_page,
                'total': answers.total
            }));
        }
        catch(error) {
            SetError(imports.dispatch, setWordsLearnedError, error.response.status);
        }
    }

    const nextClick = () => {
        fetchWords(imports.paginateData.current_page + 1);
    }

    const prevClick = () => {
        fetchWords(imports.paginateData.current_page - 1);
    }

    const numberClick = (number) => {
        fetchWords(number);
    }

    useEffect(() => {
        fetchWords();
    }, [imports.dispatch]);

    if(wordsLearnedError.header) {
        return <PageError>{wordsLearnedError.header}</PageError>
    }

    return (
        <Section>
            <div className='flex flex-row w-full lg:w-3/4 mx-auto mt-5'>
                <BackButton />
            </div>
            <div className='flex flex-col w-full lg:w-3/4 lg:flex-row mx-auto my-10 gap-10'>
                <div className='w-full flex flex-col lg:w-1/4 gap-3'>
                    <ProfileInfo id={imports.params.id} />
                </div>
                <div className='w-full lg:w-3/4 flex flex-col'>
                    <div className='w-full border border-blue-300 rounded-sm p-5 divide-y-2 divide-blue-200'>
                        <div className='w-full flex flex-row justify-between pb-2'>
                            <div className='font-semibold text-lg'>Words learned</div>
                            <div>{imports.paginateData.from}-{imports.paginateData.to} of {imports.paginateData.total}</div>
                        </div>
                        <div className='w-full pt-2'>
                            <div className={`w-full grid grid-cols-1 ${keys(wordsLearnedData.answers).length > 5? 'lg:grid-cols-2' : ''}`}>
                                <div className={`w-full flex flex-row border-blue-200 py-2 text-center items-center font-semibold ${keys(wordsLearnedData.answers).length > 5? 'lg:border-r' : ''}`}>
                                    <div className='w-1/2'>
                                        Words
                                    </div>
                                    <div className='w-1/2'>
                                        Answers
                                    </div>
                                </div>
                                <div className={`hidden w-full flex-row py-2 text-center items-center font-semibold ${keys(wordsLearnedData.answers).length > 5? 'lg:flex': ''}`}>
                                    <div className='w-1/2'>
                                        Words
                                    </div>
                                    <div className='w-1/2'>
                                        Answers
                                    </div>
                                </div>
                                {
                                    map(wordsLearnedData.answers, function(value, key) {
                                        const borders = ((key%2 === 0) && (keys(wordsLearnedData.answers).length > 5))? 'lg:border-r border-blue-200': '';
                                        const word = find(wordsLearnedData.words, ['id', value.words_id])? find(wordsLearnedData.words, ['id', value.words_id]) : '';
                                        return (
                                            <div key={key} className={`w-full flex flex-row py-1 text-center items-center ${borders}`}>
                                                <div className='w-1/2'>
                                                    {word.word}
                                                </div>
                                                <div className='w-1/2'>
                                                    {value.choice}
                                                </div>
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

export default WordsLearned;
