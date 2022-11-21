import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../api/axios';
import { setWordData, setWordErrors } from '../redux/addWord';
import BackButton from '../components/molecules/BackButton';
import FormTemplate from '../components/templates/FormTemplate';
import Section from '../components/atoms/Section';
import HeaderError from '../components/atoms/HeaderError';
import LessonInput from '../components/molecules/LessonInput';
import ChoiceInput from '../components/molecules/ChoiceInput';
import SubmitButton from '../components/atoms/SubmitButton';

const AddWord = () => {
    const { wordData, wordErrors } = useSelector(state => state.addWord);
    const { token } = useSelector(state => state.persist.userAuthentication);
    const [ lessonData, setLessonData ] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        map(wordData, function(value, key){
            dispatch(setWordData({key, value: ''}));
        });

        map(wordErrors, function(value, key){
            dispatch(setWordErrors({key, value: ''}));
        });

        const fetchLesson = async () => {
            try {
                const response = await axios.get(`/categories/${params.lessonId}`, axiosConfig);

                setLessonData(response.data);
            }
            catch(error) {
                navigate('/admin/categories', {replace: true});
            }
        }

        fetchLesson();

    }, [dispatch]);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/admin/categories/${params.lessonId}/words/add`, wordData, axiosConfig);

            navigate(-1, {replace: true});
        }
        catch (error) {
            map(wordErrors, function(value, key){
                dispatch(setWordErrors({key, value: ''}));
            });

            if(error.response.status === 400) {
                map(error.response.data.errors, function(value, key){
                    dispatch(setWordErrors({key, value}));
                });
                return;
            }

            if(error.response.status === 401) {
                dispatch(setWordErrors({key: 'header', value: 'Administrative Privileges Required'}));
                return;
            }

            if(error.response.status === 404) {
                dispatch(setWordErrors({key: 'header', value: 'Lesson not found'}));
                return;
            }

            if(error.response.status === 500) {
                dispatch(setWordErrors({key: 'header', value: 'No response from the server'}));
                return;
            }

            dispatch(setWordErrors({key: 'header', value: 'Add Word and Choices Failed'}));
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
                formHeader={`Add word for ${lessonData.title} lesson`}
            >
                <HeaderError>{wordErrors.header}</HeaderError>
                <div className='flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0'>
                    <div className='w-full'>
                        <LessonInput value={wordData.word} onChange={(e) => dispatch(setWordData({key: 'word', value: e.target.value}))} errorMessage={wordErrors.word} inputType='text' inputName='word' inputLabel='Word' />
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-col justify-start py-2 space-y-2'>
                            <label className='text-lg w-full'>Answer</label>
                            <ChoiceInput value={wordData.answer} onChange={(e) => dispatch(setWordData({key: 'answer', value: e.target.value}))} inputType='text' errorMessage={wordErrors.answer} inputName='answer' />
                        </div>
                        <div className='flex flex-col justify-start py-2 space-y-2'>
                            <label className='text-lg w-full'>Other choices</label>
                            <ChoiceInput value={wordData.choice2} onChange={(e) => dispatch(setWordData({key: 'choice2', value: e.target.value}))} inputType='text' errorMessage={wordErrors.choice2} inputName='choice2' />
                            <ChoiceInput value={wordData.choice3} onChange={(e) => dispatch(setWordData({key: 'choice3', value: e.target.value}))} inputType='text' errorMessage={wordErrors.choice3} inputName='choice2' />
                            <ChoiceInput value={wordData.choice4} onChange={(e) => dispatch(setWordData({key: 'choice4', value: e.target.value}))} inputType='text' errorMessage={wordErrors.choice4} inputName='choice2' />
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

export default AddWord;
