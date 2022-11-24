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
import BackButton from '../components/molecules/BackButton';
import Section from '../components/atoms/Section';

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

                map(response.data, function(value, key) {
                    dispatch(editLessonData({key, value}));
                });

                dispatch(editLessonErrors({key: 'header', value: ''}));
            }
            catch(error) {
                if(error.response.status === 404) {
                    dispatch(editLessonErrors({key: 'header', value: 'Lesson not found'}));
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
            const response = await axios.put(`/admin/categories/${params.id}/edit`, lessonData, axiosConfig);

            map(lessonData, function(value, key){
                dispatch(editLessonData({key, value: ''}));
            });

            map(lessonErrors, function(value, key){
                dispatch(editLessonErrors({key, value: ''}));
            });

            navigate(-1, {replace: true});
        }
        catch (error) {
            map(lessonErrors, function(value, key){
                dispatch(editLessonErrors({key, value: ''}));
            });

            if(error.response.status === 400) {
                map(error.response.data.errors, function(value, key){
                    dispatch(editLessonErrors({key, value}));
                });
                return;
            }

            if(error.response.status === 401) {
                dispatch(editLessonErrors({key: 'header', value: 'Administrative Privileges Required'}));
                return;
            }

            if(error.response.status === 404) {
                dispatch(editLessonErrors({key: 'header', value: 'Lesson not found'}));
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
        <Section>
            <div className='container w-full lg:w-1/3 mx-auto mt-6'>
                <BackButton />
            </div>
            <FormTemplate onSubmit={onSubmit} formHeader='Edit Lesson'>
                <HeaderError>{lessonErrors.header}</HeaderError>
                <LessonInput value={lessonData.title} onChange={(e) => dispatch(editLessonData({key: 'title', value: e.target.value}))} errorMessage={lessonErrors.title} inputType='text' inputName='title' inputLabel='Title' />
                <LessonTextarea value={lessonData.description} onChange={(e) => dispatch(editLessonData({key: 'description', value: e.target.value}))} errorMessage={lessonErrors.description} textareaName='description' textareaLabel='Description' />
                <div className='flex justify-center'>
                    <SubmitButton buttonText='Update' custStyle='mt-5' />
                </div>
            </FormTemplate>
        </Section>
    );
}

export default EditLesson;
