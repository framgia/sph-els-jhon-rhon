import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import axios from '../../api/axios';
import { setLessonsData, setLessonsError } from '../../redux/lessons';

const FetchLessons = () => {
    const { token } = useSelector(state => state.persist.userAuthentication);
    const dispatch = useDispatch();
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    useEffect(() => {
        lessons();
    }, [dispatch]);

    const lessons = async () => {
        try {
            const response = await axios.get('/categories', axiosConfig);

            dispatch(setLessonsData(response.data.lessons));
        }
        catch (error) {
            dispatch(setLessonsError());
        }
    }
}

export default FetchLessons;
