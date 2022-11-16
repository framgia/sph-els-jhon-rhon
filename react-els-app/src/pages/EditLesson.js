import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../api/axios';
import FormTemplate from '../components/templates/FormTemplate';
import SubmitButton from '../components/atoms/SubmitButton';
import LessonInput from '../components/molecules/LessonInput';
import LessonTextarea from '../components/molecules/LessonTextarea';
import { editLessonData, editLessonErrors } from '../redux/editLesson';
import HeaderError from '../components/atoms/HeaderError';

const EditLesson = () => {
    const { lessonData, lessonErrors } = useSelector(state => state.editLesson);
    const { token } = useSelector(state => state.persist.userAuthentication);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`/categories/${params.id}`, axiosConfig);

                map(response.data.lesson, function(value, key) {
                    dispatch(editLessonData({key, value}));
                });

                dispatch(editLessonErrors({key: 'header', value: ''}));
            }
            catch(error) {
                if(error.response.status === 404) {
                    map(error.response.data.errors, function(value, key){
                        dispatch(editLessonErrors({key, value}));
                    });
                    return;
                }

                if(error.response.status === 500) {
                    dispatch(editLessonErrors({key: 'header', value: 'No response from the server'}));
                    return;
                }

                dispatch(editLessonErrors({key: 'header', value: 'Failed to fetch lesson'}));
            }
        }

        fetchLesson();

    }, [dispatch]);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/admin/categories/${params.id}/edit`, lessonData, axiosConfig);

            map(lessonData, function(value, key){
                dispatch(editLessonData({key, value: ''}));
            });

            map(lessonErrors, function(value, key){
                dispatch(editLessonErrors({key, value: ''}));
            });

            navigate('/admin/categories');
        }
        catch (error) {
            map(lessonErrors, function(value, key){
                dispatch(editLessonErrors({key, value: ''}));
            });

            if( (error.response.status === 400) || (error.response.status === 401) ) {
                map(error.response.data.errors, function(value, key){
                    dispatch(editLessonErrors({key, value}));
                });
                return;
            }

            if(error.response.status === 500) {
                dispatch(editLessonErrors({key: 'header', value: 'No response from the server'}));
                return;
            }

            dispatch(editLessonErrors({key: 'header', value: 'Update Lesson Failed'}));
        }
    }

    return (
        <section>
            <FormTemplate onSubmit={onSubmit} formHeader='Edit Lesson'>
                <HeaderError>{lessonErrors.header}</HeaderError>
                <LessonInput value={lessonData.title} onChange={(e) => dispatch(editLessonData({key: 'title', value: e.target.value}))} errorMessage={lessonErrors.title} inputType='text' inputName='title' inputLabel='Title' />
                <LessonTextarea value={lessonData.description} onChange={(e) => dispatch(editLessonData({key: 'description', value: e.target.value}))} errorMessage={lessonErrors.description} textareaName='description' textareaLabel='Description' />
                <SubmitButton buttonText='Update' custStyle='mt-5' />
            </FormTemplate>
        </section>
    );
}

export default EditLesson;
