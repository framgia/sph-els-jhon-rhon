import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const Imports = () => {
    const { token } = useSelector(state => state.persist.userAuthentication);
    const { paginateData } = useSelector(state => state.paginate)
    const [ isOpen, setIsOpen ] = useState(false);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return ({
        dispatch: dispatch,
        token: token,
        navigate: navigate,
        location: location,
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        searchParams: searchParams,
        paginateData: paginateData,
        params: params,
    });
}
