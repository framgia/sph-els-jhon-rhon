import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DefaultButton from '../components/atoms/DefaultButton';
import TableCell from '../components/atoms/TableCell';
import TableHeader from '../components/atoms/TableHeader';
import { map } from 'lodash';
import FetchLessons from '../components/templates/FetchLessons';

const AdminCategories = () => {
    const { lessonsData, lessonsError } = useSelector(state => state.lessons);

    FetchLessons();

    return (
        <section>
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
                                        <Link className='flex justify-center items-center'>Add word</Link>
                                        <Link to={`/admin/categories/${value.id}/edit`} className='flex justify-center items-center'>Edit</Link>
                                        <Link className='flex justify-center items-center'>Delete</Link>
                                    </div>
                                </TableCell>
                            </tr>
                        );
                    })
                }</tbody>
                </table>
            </div>
        </section>
    );
}

export default AdminCategories;
