import { capitalize, map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from '../api/axios';
import Input from '../components/atoms/Input';
import Section from '../components/atoms/Section';
import BackButton from '../components/molecules/BackButton';
import PageError from '../components/organisms/PageError';
import Pagination from '../components/organisms/Pagination';
import { Imports } from '../components/templates/Imports';
import { errorList } from '../components/utils/errorList';
import { setPaginateData } from '../redux/paginate';

const UserList = () => {
    const imports = Imports();
    const [ users, setUsers ] = useState({});
    const [ usersErrors, setUsersError ] = useState({});

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const fetchAllUsers = async () => {
        const pageParams = imports.searchParams.get('page');
        const page = (pageParams && (pageParams > 0))? imports.location.search: '';

        try {
            const response = await axios.get(`/search/users${page}`, axiosConfig);
            const respUsers = response.data;

            if(!pageParams || (pageParams < 1)) {
                window.history.replaceState(null, null, `${imports.location.pathname}?page=${respUsers.current_page}`);
            }

            if((respUsers.data.length === 0) && (respUsers.last_page > 1)) {
                imports.navigate(`${imports.location.pathname}?page=${respUsers.current_page}`, {replace: true});
            }

            setUsers(respUsers.data);
            imports.dispatch(setPaginateData({
                'current_page': respUsers.current_page,
                'last_page': respUsers.last_page,
                'from': respUsers.from,
                'to': respUsers.to,
                'per_page': respUsers.per_page,
                'total': respUsers.total 
            }));
        }
        catch(error) {
            setUsersError({header: errorList(error.response.status)});
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [imports.location]);

    if(usersErrors.header) {
        return <PageError>{usersErrors.header}</PageError>
    }

    return (
        <Section>
                <div className='container w-full lg:w-1/2 mx-auto mt-6'>
                    <BackButton />
                </div>
                <div className='flex flex-col w-full lg:w-1/2 mx-auto mt-6 divide-y-2 gap-4 divide-blue-200'>
                    
                    <div className='flex flex-col pt-2 gap-3'>
                        <div className='w-full flex flex-row gap-3 items-baseline'>
                            <div className='text-lg'>Users list:</div><div className='  text-md'>{imports.paginateData.from} to {imports.paginateData.to} of {imports.paginateData.total}</div>
                        </div>
                        <div className='flex flex-col divide-y divide-blue-200'>
                            {
                                map(users, function(value, key) {
                                    return (
                                        <div key={key} className='w-full flex flex-row items-center gap-5 py-2'>
                                            <div className='flex w-10 h-10 text-xs items-center border border-blue-300 justify-center'>
                                                <div>Image</div>
                                            </div>
                                            <Link to={`/profile/${value.id}`} className='flex flex-col text-blue-600 cursor-pointer hover:underline'>
                                                {capitalize(value.fname)} {capitalize(value.lname)}
                                            </Link>
                                        </div>     
                                    );
                                })  
                            }
                        </div>
                        <Pagination paginateData={imports.paginateData}/>
                    </div>
                </div>
            </Section>
    );
}

export default UserList;
