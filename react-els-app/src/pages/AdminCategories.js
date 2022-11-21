import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import axios from '../api/axios';
import DefaultButton from '../components/atoms/DefaultButton';
import TableCell from '../components/atoms/TableCell';
import TableHeader from '../components/atoms/TableHeader';
import { map } from 'lodash';
import FetchLessons from '../components/templates/FetchLessons';
import LinkButton from '../components/atoms/LinkButton';
import ModalForm from '../components/organisms/ModalForm';
import HeaderError from '../components/atoms/HeaderError';
import { deleteLessonKey, setDeleteError } from '../redux/deleteLesson';
import Section from '../components/atoms/Section';
import TableRow from '../components/atoms/TableRow';
import Pagination from '../components/organisms/Pagination';
import PageError from '../components/organisms/PageError';
import BackButton from '../components/molecules/BackButton';
import Empty from '../components/atoms/Empty';

const AdminCategories = () => {
    const { lessonsData, lessonsError } = useSelector(state => state.lessons);
    const { paginateData } = useSelector(state => state.paginate)
    const { deleteKey, deleteError } = useSelector(state => state.deleteLesson);
    const { token } = useSelector(state => state.persist.userAuthentication);
    const [ isOpen, setIsOpen ] = useState(false);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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
            
            dispatch(setDeleteError(''));
            dispatch(deleteLessonKey({}));

            setIsOpen(false);
            FetchLessons(dispatch, token, location, searchParams, navigate);
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

    const rowClick = (id) => {
        navigate(`/admin/categories/${id}`);
    }

    useEffect(() => {
        FetchLessons(dispatch, token, location, searchParams, navigate);
    }, [location]);

    if(lessonsError) {
        return <PageError>{lessonsError}</PageError>
    }

    return (
        <Section>
            <ModalForm isOpen={isOpen} onSubmit={submitDelete} onClose={() => setIsOpen(false)} modalHeader='Confirm Delete' submitText='Delete' btnBgColor='bg-red-500 hover:bg-red-700 focus:outline-red-500'>
                <HeaderError>{deleteError}</HeaderError>
                Are you sure you want to delete?
            </ModalForm>
            <div className='flex flex-col w-full lg:w-3/4 mx-auto mt-4'>
                <div className='flex flex-row w-full justify-between'>
                <BackButton />
                <Link to='/admin/categories/add' className='self-end'>
                    <DefaultButton btnType='button' custStyle='w-36'>Add lesson</DefaultButton>
                </Link>
                </div>
                <table className='categories-table table-auto mt-2 w-full'>
                <thead>
                    <tr>
                        <TableHeader custStyle='px-6 py-5 w-1/4 border-t border-l'>Title</TableHeader>
                        <TableHeader custStyle='px-6 w-full border-t'>Description</TableHeader>
                        <TableHeader custStyle='px-6 w-auto border-t border-r'></TableHeader>
                    </tr>
                </thead>
                <tbody>{
                    map(lessonsData, function(value, key) {
                        return (
                            <React.Fragment key={key}>
                            <TableRow onClick={() => rowClick(value.id)} >
                                <TableCell custStyle='px-6 py-2 border-l text-start font-normal'>{value.title}</TableCell>
                                <TableCell custStyle='px-6 py-2 text-start font-light'>{value.description}</TableCell>
                                <TableCell custStyle='py-0 border-r'>
                                    <div onClick={(e) => e.stopPropagation()} className='flex flex-col px-6 py-2 divide-y lg:flex-row lg:divide-x lg:divide-y-0 divide-blue-300'>
                                        <Link to={`/admin/categories/${value.id}/words/add`} className='break-keep text-center self-center w-24 pb-3 hover:font-semibold lg:pr-3 lg:pb-0 '>Add word</Link>
                                        <Link to={`/admin/categories/${value.id}/edit`} className='break-keep text-center self-center w-14 py-3 hover:font-semibold hover:text-blue-600 lg:px-3 lg:py-0 '>Edit</Link>
                                        <LinkButton onClick={() => onDelete(key)} custStyle='break-keep text-center self-center w-16 pt-3 hover:font-semibold hover:text-red-600 lg:pl-3 lg:pt-0 '>Delete</LinkButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                            </React.Fragment>
                        );                                
                    })
                }</tbody>
                </table>
                <Pagination paginateData={paginateData} />
            </div>
        </Section>
    );
}

export default AdminCategories;
