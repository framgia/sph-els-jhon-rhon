import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import axios from '../api/axios';
import DefaultButton from '../components/atoms/DefaultButton';
import TableCell from '../components/atoms/TableCell';
import TableHeader from '../components/atoms/TableHeader';
import { map, omit } from 'lodash';
import FetchLessons from '../components/templates/FetchLessons';
import LinkButton from '../components/atoms/LinkButton';
import ModalForm from '../components/organisms/ModalForm';
import HeaderError from '../components/atoms/HeaderError';
import { deleteLessonKey, setDeleteError } from '../redux/deleteLesson';
import { setLessonsData } from '../redux/lessons';
import Section from '../components/atoms/Section';

const AdminCategories = () => {
    const { lessonsData, lessonsError } = useSelector(state => state.lessons);
    const { deleteKey, deleteError } = useSelector(state => state.deleteLesson);
    const { token } = useSelector(state => state.persist.userAuthentication);
    const [ isOpen, setIsOpen ] = useState(false);
    const dispatch = useDispatch();

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const onDelete = (id) => {
        setIsOpen(true);
        dispatch(setDeleteError(''));
        dispatch(deleteLessonKey(id));
    }

    const submitDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/admin/categories/${lessonsData[deleteKey].id}/delete`, lessonsData[deleteKey], axiosConfig);            
            
            const lessons = map(omit(lessonsData, [deleteKey]), function(value) {
                return value;
            });

            dispatch(setLessonsData(lessons));
            dispatch(setDeleteError(''));
            dispatch(deleteLessonKey({}));

            setIsOpen(false);
        }
        catch (error) {
            if(error.response.status === 404) {
                dispatch(setDeleteError('Lesson not found'));
                return;
            }

            if(error.response.status === 401) {
                dispatch(setDeleteError('Administrative Privileges Required'));
                return;
            }

            if(error.response.status === 500) {
                dispatch(setDeleteError('No response from the server'));
                return;
            }
            
            dispatch(setDeleteError('Delete Lesson Failed'));
        }
    }
    
    FetchLessons();

    return (
        <Section>
            <ModalForm isOpen={isOpen} onSubmit={submitDelete} onClose={() => setIsOpen(false)} modalHeader='Confirm Delete' submitText='Delete' btnBgColor='bg-red-500 hover:bg-red-700 focus:outline-red-500'>
                <HeaderError>{deleteError}</HeaderError>
                Are you sure you want to delete?
            </ModalForm>
            <div className='flex flex-col w-full lg:w-3/4 mx-auto mt-4'>
                <Link to='/admin/categories/add' className='self-end'>
                    <DefaultButton btnType='button' custStyle='w-36'>Add lesson</DefaultButton>
                </Link>
                <table className='table-fixed mt-2 border-collapse w-full'>
                <thead>
                    <tr>
                        <TableHeader custStyle='w-1/4'>Title</TableHeader>
                        <TableHeader>Description</TableHeader>
                        <TableHeader custStyle='w-1/4'></TableHeader>
                    </tr>
                </thead>
                <tbody>{
                    map(lessonsData, function(value, key) {
                        const cellColor = (key%2 === 0)? '' : 'bg-blue-100';
                        return (
                            <tr key={key}>
                                <TableCell custStyle={`${cellColor} p-2`}>{value.title}</TableCell>
                                <TableCell custStyle={`${cellColor} p-2`}>{value.description}</TableCell>
                                <TableCell custStyle={`${cellColor} p-2`}>
                                    <div className='grid grid-rows-3 divide-y lg:grid-rows-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 divide-blue-300'>
                                        <Link to={`/admin/categories/${value.id}/words/add`} className='grid justify-center items-center p-2 lg:p-0'>Add word</Link>
                                        <Link to={`/admin/categories/${value.id}/edit`} className='grid justify-center items-center p-2 lg:p-0'>Edit</Link>
                                        <LinkButton onClick={() => onDelete(key)} custStyle='grid justify-center items-center p-2 lg:p-0'>Delete</LinkButton>
                                    </div>
                                </TableCell>
                            </tr>
                        );
                    })
                }</tbody>
                </table>
            </div>
        </Section>
    );
}

export default AdminCategories;
