import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const Imports = () => {
    const { token } = useSelector(state => state.persist.userAuthentication);
    const { lessonsData, lessonsError } = useSelector(state => state.lessons);
    const { paginateData } = useSelector(state => state.paginate)
    const [ isOpen, setIsOpen ] = useState(false);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    

    return ({
        dispatch: dispatch,
        token: token,
        navigate: navigate,
        location: location,
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        searchParams: searchParams,
        lessonsData: lessonsData,
        lessonsError: lessonsError,
        paginateData: paginateData,
    });
}
