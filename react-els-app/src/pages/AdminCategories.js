import React from 'react';
import { Link } from 'react-router-dom';

import DefaultButton from '../components/atoms/DefaultButton';

const AdminCategories = () => {
    return (
        <section>
            <div className='flex flex-col w-full lg:w-3/4 mx-auto mt-4'>
                <Link to='/admin/categories/add' className='self-end'>
                    <DefaultButton btnType='button' custStyle='w-36'>Add lesson</DefaultButton>
                </Link>
                <table className='table-fixed mt-2 border-collapse w-full'>
                <thead>
                    <tr>
                        <td className='border border-y-blue-500 border-l-blue-500 text-white border-solid p-2 bg-blue-500 font-semibold text-center w-1/4'>Title</td>
                        <td className='border border-y-blue-500 border-x-white-500 text-white border-solid p-2 bg-blue-500 font-semibold text-center'>Description</td>
                        <td className='border border-y-blue-500 border-r-blue-500 text-white border-solid p-2 bg-blue-500 font-semibold text-center w-1/4'></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border border-blue-300 border-solid p-2'>Lesson title</td>
                        <td className='border border-blue-300 border-solid p-2'>Some Description ASDF ASDF ASDF ASDFasdfdsa</td>
                        <td className='border border-blue-300 border-solid p-2'>Add word | Edit | Delete</td>
                    </tr>
                    <tr>
                        <td className='border border-blue-300 border-solid p-2 bg-blue-100'>Lesson title</td>
                        <td className='border border-blue-300 border-solid p-2 bg-blue-100'>Some Description ASDF ASDF ASDF ASDFasdfdsa</td>
                        <td className='border border-blue-300 border-solid p-2 bg-blue-100'>Add word | Edit | Delete</td>
                    </tr>
                    <tr>
                        <td className='border border-blue-300 border-solid p-2'>Lesson title</td>
                        <td className='border border-blue-300 border-solid p-2'>Some Description ASDF ASDF ASDF ASDFasdfdsa</td>
                        <td className='border border-blue-300 border-solid p-2'>Add word | Edit | Delete</td>
                    </tr>
                    <tr>
                        <td className='border border-blue-300 border-solid p-2 bg-blue-100'>Lesson title</td>
                        <td className='border border-blue-300 border-solid p-2 bg-blue-100'>Some Description ASDF ASDF ASDF ASDFasdfdsa</td>
                        <td className='border border-blue-300 border-solid p-2 bg-blue-100'>Add word | Edit | Delete</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </section>
    );
}

export default AdminCategories;
