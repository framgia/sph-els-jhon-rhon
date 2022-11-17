import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import FormTemplate from '../components/templates/FormTemplate';
import SubmitButton from '../components/atoms/SubmitButton';
import LessonInput from '../components/molecules/LessonInput';
import LessonTextarea from '../components/molecules/LessonTextarea';
import { setLessonData, setLessonErrors } from '../redux/addLesson';
import HeaderError from '../components/atoms/HeaderError';

const AddLesson = () => {
    const { lessonData, lessonErrors } = useSelector(state => state.addLesson);
    const { token } = useSelector(state => state.persist.userAuthentication);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/admin/categories/add', lessonData, axiosConfig);

            map(lessonData, function(value, key){
                dispatch(setLessonData({key, value: ''}));
            });

            map(lessonErrors, function(value, key){
                dispatch(setLessonErrors({key, value: ''}));
            });

            navigate('/admin/categories');
        }
        catch (error) {
            map(lessonErrors, function(value, key){
                dispatch(setLessonErrors({key, value: ''}));
            });

            if(error.response.status === 400) {
                map(error.response.data.errors, function(value, key){
                    dispatch(setLessonErrors({key, value}));
                });
                return;
            }
            
            if(error.response.status === 401) {
                dispatch(setLessonErrors({key: 'header', value: 'Administrative Privileges Required'}));
                return;
            }

            if(error.response.status === 500) {
                dispatch(setLessonErrors({key: 'header', value: 'No response from the server'}));
                return;
            }

            dispatch(setLessonErrors({key: 'header', value: 'Add Lesson Failed'}));
        }
    }

    return (
        <section>
            <FormTemplate onSubmit={onSubmit} formHeader='Add Lesson'>
                <HeaderError>{lessonErrors.header}</HeaderError>
                <LessonInput value={lessonData.title} onChange={(e) => dispatch(setLessonData({key: 'title', value: e.target.value}))} errorMessage={lessonErrors.title} inputType='text' inputName='title' inputLabel='Title' />
                <LessonTextarea value={lessonData.description} onChange={(e) => dispatch(setLessonData({key: 'description', value: e.target.value}))} errorMessage={lessonErrors.description} textareaName='description' textareaLabel='Description' />
                <SubmitButton buttonText='Add' custStyle='mt-5' />
            </FormTemplate>
        </section>
    );
}

export default AddLesson;
