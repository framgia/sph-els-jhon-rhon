import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from '../api/axios';
import Section from '../components/atoms/Section';
import BackButton from '../components/molecules/BackButton';
import { Imports } from '../components/templates/Imports';
import { setWordsData, setWordsError } from '../redux/words';
import SetError from '../components/templates/SetError';
import PageError from '../components/organisms/PageError';
import { lessonData, setLessonError } from '../redux/lesson';
import { initializeAnswer, setAnswerComplete, setAnswerCurrent, setAnswerData } from '../redux/answer';
import { setChoices } from '../redux/choices';
import { map } from 'lodash';
import WhiteButton from '../components/atoms/WhiteButton';

const Answer = () => {
    const imports = Imports();
    const { wordsData } = useSelector(state => state.words);
    const { lesson, lessonError } = useSelector(state => state.lesson);
    const { current, answerData, completed } = useSelector(state => state.answer);
    const { choices } = useSelector(state => state.choices);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const fetchWords = async () => {
        imports.dispatch(setAnswerCurrent(null));
        try {
            const response = await axios.get(`/categories/${imports.params.id}/words`, axiosConfig);
            const answerInitialize = {}

            imports.dispatch(lessonData(response.data.lesson));
            imports.dispatch(setWordsData(response.data.words));
            if(response.data.words.length > 0) {
                imports.dispatch(setAnswerCurrent(0));
            }

            map(response.data.words, function(value, key) {
                answerInitialize[key] = {'words_id': value.id, 'answer': null};
            });

            imports.dispatch(initializeAnswer(answerInitialize));
        }
        catch(error) {
            SetError(imports.dispatch, setLessonError, error.response.data.status);
        }
    }

    const fetchChoices = async () => {
        try {
            const response = await axios.get(`/categories/words/${wordsData[current].id}/choices`, axiosConfig);

            imports.dispatch(setChoices(response.data));
        }
        catch(error) {
            SetError(imports.dispatch, setWordsError, error.response.data.status);
        }
    }

    const onChoiceSelect = async (event, curr, val) => {
        if((curr+1) < wordsData.length) {
            await imports.dispatch(setAnswerData({key: curr, value: {'words_id': val.words_id, 'answer': val.id}}));
            await imports.dispatch(setAnswerCurrent(curr+1));
            event.target.blur();
            return;
        }       
        imports.dispatch(setAnswerData({key: curr, value: {'words_id': val.words_id, 'answer': val.id}}));
        imports.dispatch(setAnswerComplete());
    }

    const submitAnswers = async () => {
        try {
            const response = await axios.post(`/categories/${imports.params.id}/answers`, {'answers': answerData},axiosConfig);

            imports.navigate(-1, {result: true});
        }
        catch(error) {
            SetError(imports.dispatch, setWordsError, error.response.data.status);
        }
    }

    useEffect(() => {
        fetchWords();
    }, [imports.dispatch]);
    
    useEffect(() => {
        if(!(current === null)) {
            fetchChoices();
        }
    }, [current]);

    useEffect(() => {
        if(completed) {
            submitAnswers();
        }
    }, [completed]);

    if(lessonError.header || (current === null)) {
        return <PageError>{lessonError.header? lessonError.header : 'No words to show'}</PageError>
    }

    return (
        <Section>
            <div className='flex flex-col w-full lg:w-1/2 mx-auto mt-4'>
                <div className='flex flex-row w-full justify-between'>
                    <BackButton />
                </div>
                <div className='w-full mt-6 py-4 divide-y-2 divide-blue-200'>
                    <div className='w-full py-4 font-semibold text-xl'>
                        {lesson.title}
                    </div>
                    <div>
                        <div className='w-full text-center py-3 text-sm'>
                            {!(current === null)? current + 1: 0}/{wordsData.length}
                        </div>
                        <div className='flex flex-col w-full items-center justify-center lg:flex-row gap-5 py-3'>
                            <div className='w-full text-5xl max-w-md py-10 text-center'>
                                {wordsData[current].word}
                            </div>
                            <div className='w-full max-w-md flex flex-col gap-3'>
                                {
                                    map(choices, function(value, key) {
                                        return (
                                            <React.Fragment key={key}>
                                                <WhiteButton onClick={(event) => onChoiceSelect(event, current, value)} btnType='button' custStyle='w-full py-3'>{value.choice}</WhiteButton>
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Answer;
