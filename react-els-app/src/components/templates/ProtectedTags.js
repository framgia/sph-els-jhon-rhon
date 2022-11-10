import { useSelector } from 'react-redux';

const ProtectedTags = ({ children, allowedRoles }) => {
    const { isLoggedIn } = useSelector(state => state.persist.userAuthentication);

    if(!isLoggedIn && (allowedRoles === 'guest')) {
        return children;
    }
    if(isLoggedIn && (allowedRoles === 'authenticated')) {
        return children;
    }

    return;
}

export default ProtectedTags;
