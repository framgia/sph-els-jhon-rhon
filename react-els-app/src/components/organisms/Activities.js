import { capitalize, map, orderBy } from 'lodash';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from '../../api/axios';
import { setActivitiesData, setActivitiesErrors } from '../../redux/activities';
import { setPaginateData } from '../../redux/paginate';
import HeaderError from '../atoms/HeaderError';
import { Imports } from '../templates/Imports';
import SetError from '../templates/SetError';
import TimeAgo from '../templates/TimeAgo';
import PagiPage from './PagiPage';
import Empty from '../atoms/Empty';

const Activities = ({id}) => {
    const imports = Imports();
    const { activitiesData, activitiesError } = useSelector(state => state.activities);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${imports.token}`
        }
    }

    const destructure = (type, data) => {
        const userLink = (user) => {
            const to = user.id === imports.user.id? '/': `/profile/${user.id}`
            const text = user.id === imports.user.id? 'You' : `${capitalize(user.fname)} ${capitalize(user.lname)}`;

            return <Link to={to} className='text-blue-600 font-semibold hover:underline'>{text}</Link>;
        }

        switch(type) {
            case('result'):
                return <div>{userLink(data.user)} learned {data.result.score} of {data.result.total} words in {data.lesson.title}</div>;
            case('follow'):
                return <div>{userLink(data.user)} followed {userLink(data.followedUser)}</div>;
            default:
                return;
        }
    }

    const fetchActivities = async (page = 0) => {
        const pageSearch = (page)? `?page=${page}` : '';
        const routes = (id === imports.user.id)? `/${id}/activities${pageSearch}`: `profile/${id}/activities${pageSearch}`;
        try {
            const response = await axios.get(routes, axiosConfig);

            imports.dispatch(setActivitiesData(orderBy(response.data.data, ['created_at'], ['desc'])));
            imports.dispatch(setPaginateData({
                'current_page': response.data.current_page,
                'last_page': response.data.last_page,
                'from': response.data.from,
                'to': response.data.to,
                'per_page': response.data.per_page,
                'total': response.data.total
            }));
        }
        catch(error) {
            SetError(imports.dispatch, setActivitiesErrors, error.response.status);
        }
    }

    const nextClick = () => {
        fetchActivities(imports.paginateData.current_page + 1);
    }

    const prevClick = () => {
        fetchActivities(imports.paginateData.current_page - 1);
    }

    const numberClick = (number) => {
        fetchActivities(number);
    }

    useEffect(() => {
        fetchActivities();
    }, [imports.dispatch, imports.location]);

    if(activitiesError.header) {
        return <HeaderError>{activitiesError.header}</HeaderError>
    }
    
    return (
        <div className='w-full lg:w-3/4 border border-blue-300 rounded-sm p-5 divide-y-2 divide-blue-200'>
            <div className='font-semibold text-lg pb-2'>Activities</div>
            <div className='w-full flex flex-col divide-y py-2 divide-blue-100'>
                {
                    map(activitiesData, function(value, key) {
                        return (
                            <div key={key} className='w-full flex flex-col py-2'>
                                <div className='w-full flex flex-row items-center gap-5'>
                                    <div className='flex w-10 h-10 text-xs items-center border border-blue-300 justify-center'>
                                        <div>Image</div>
                                    </div>
                                    <div className='flex flex-col'>
                                    {destructure(value.type, value)}
                                    <div className='text-xs text-gray-500'><TimeAgo input={value.created_at} /></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <Empty data={activitiesData}>No activities to show...</Empty>
            </div>
            <PagiPage paginateData={imports.paginateData} nextClick={nextClick} prevClick={prevClick} numberClick={numberClick} />
        </div>
    );
}

export default Activities;
