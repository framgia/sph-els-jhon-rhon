import { map } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderError from '../components/atoms/HeaderError';

import axios from '../api/axios';
import Section from '../components/atoms/Section';
import SubmitButton from '../components/atoms/SubmitButton';
import BackButton from '../components/molecules/BackButton';
import ChoiceInput from '../components/molecules/ChoiceInput';
import LessonInput from '../components/molecules/LessonInput';
import FormTemplate from '../components/templates/FormTemplate';
import { setEditChoicesId, setEditWordData, setEditWordErrors } from '../redux/editWord';

const EditWord = () => {
    const { lesson } = useSelector(state => state.lesson);
    const { wordData, wordErrors } = useSelector(state => state.editWord);
    const { token } = useSelector(state => state.persist.userAuthentication);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        map(wordData, function(value, key){
            dispatch(setEditWordData({key, value: ''}));
        });

        map(wordErrors, function(value, key){
            dispatch(setEditWordErrors({key, value: ''}));
        });
        
        const fetchWord = async () => {
            try {
                const response = await axios.get(`/categories/words/${params.id}`, axiosConfig);

                map(response.data.data, function(value, key) {
                    if(key === 'word') {
                        dispatch(setEditWordData({key, value: value.word}));
                        return;
                    }
                    dispatch(setEditWordData({key, value: value.choice}));
                    dispatch(setEditChoicesId({key, value: value.id}));
                });
                map(wordErrors, function(value, key) {
                    dispatch(setEditWordErrors({key, value: ''}));
                });
            }
            catch(error) {
                if(error.response.status === 404) {
                    dispatch(setEditWordErrors({key: 'header', value: 'Word not found'}));
                    return;
                }

                if(error.response.status === 500) {
                    dispatch(setEditWordErrors({key: 'header', value: 'No response from the server'}));
                    return;
                }

                dispatch(setEditWordErrors({key: 'header', value: 'Failed to fetch word'}));
            }
        }

        fetchWord();
    }, [dispatch]);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`/admin/categories/words/${params.id}/edit`, wordData, axiosConfig);

            map(wordData, function(value, key){
                dispatch(setEditWordData({key, value: ''}));
            });

            map(wordErrors, function(value, key){
                dispatch(setEditWordErrors({key, value: ''}));
            });

            navigate(-1, {replace: true});
        }
        catch (error) {
            map(wordErrors, function(value, key){
                dispatch(setEditWordErrors({key, value: ''}));
            });

            if(error.response.status === 400) {
                map(error.response.data.errors, function(value, key){
                    dispatch(setEditWordErrors({key, value}));
                });
                return;
            }

            if(error.response.status === 401) {
                dispatch(setEditWordErrors({key: 'header', value: 'Administrative Privileges Required'}));
                return;
            }

            if(error.response.status === 404) {
                dispatch(setEditWordErrors({key: 'header', value: 'Word not found'}));
                return;
            }

            if(error.response.status === 500) {
                dispatch(setEditWordErrors({key: 'header', value: 'No response from the server'}));
                return;
            }

            dispatch(setEditWordErrors({key: 'header', value: 'Add Word and Choices Failed'}));
        }
    }

    return (
        <Section>
            <div className='container w-full lg:w-3/5 mx-auto mt-6'>
                <BackButton />
            </div>
            <FormTemplate
                onSubmit={onSubmit}
                custStyle='divide-y-2 divide-blue-300'
                largeWidth='lg:w-3/5'
                headerStyle='text-start text-xl font-medium'
                formHeader={`Edit word and choices for ${lesson.title} lesson`}
            >
                <HeaderError>{wordErrors.header}</HeaderError>
                <div className='flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0'>
                    <div className='w-full'>
                        <LessonInput value={wordData.word} onChange={(e) => dispatch(setEditWordData({key: 'word', value: e.target.value}))} errorMessage={wordErrors.word} inputType='text' inputName='word' inputLabel='Word' />
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-col justify-start py-2 space-y-2'>
                            <label className='text-lg w-full'>Answer</label>
                            <ChoiceInput value={wordData.answer} onChange={(e) => dispatch(setEditWordData({key: 'answer', value: e.target.value}))} inputType='text' errorMessage={wordErrors.answer} inputName='answer' />
                        </div>
                        <div className='flex flex-col justify-start py-2 space-y-2'>
                            <label className='text-lg w-full'>Other choices</label>
                            <ChoiceInput value={wordData.choice2} onChange={(e) => dispatch(setEditWordData({key: 'choice2', value: e.target.value}))} inputType='text' errorMessage={wordErrors.choice2} inputName='choice2' />
                            <ChoiceInput value={wordData.choice3} onChange={(e) => dispatch(setEditWordData({key: 'choice3', value: e.target.value}))} inputType='text' errorMessage={wordErrors.choice3} inputName='choice2' />
                            <ChoiceInput value={wordData.choice4} onChange={(e) => dispatch(setEditWordData({key: 'choice4', value: e.target.value}))} inputType='text' errorMessage={wordErrors.choice4} inputName='choice2' />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-5'>
                    <SubmitButton buttonText='Submit'/>
                </div>
            </FormTemplate>
        </Section>
    );
}

export default EditWord;
