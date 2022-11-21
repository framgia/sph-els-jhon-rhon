import axios from '../../api/axios';
import { setLessonsData, setLessonsError } from '../../redux/lessons';
import { setPaginateData } from '../../redux/paginate';

const FetchLessons = (dispatch, token, location, searchParams, navigate) => {
    
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const fetch = async () => {

        const search = (searchParams.get('page') && searchParams.get('page') > 0)? location.search: '';

        try {
            const response = await axios.get(`/categories${search}`, axiosConfig);
            const lessons = response.data.lessons;

            if(!searchParams.get('page') || (searchParams.get('page') < 1)) {
                window.history.replaceState(null, null, `${location.pathname}?page=${lessons.current_page}`);
            }

            if(!lessons.data.length) {
                navigate(`${location.pathname}?page=${lessons.last_page}`, {replace: true});
            }

            dispatch(await setLessonsData(lessons.data));
            dispatch(await setPaginateData({
                'current_page': lessons.current_page,
                'last_page': lessons.last_page,
                'from': lessons.from,
                'to': lessons.to,
                'per_page': lessons.per_page,
                'total': lessons.total 
            }));
        }
        catch (error) {
            dispatch(setLessonsError());
        }
    }

    fetch();
    
}

export default FetchLessons;
