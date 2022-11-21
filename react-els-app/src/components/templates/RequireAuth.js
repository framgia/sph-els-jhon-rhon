import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { roles } from '../../redux/roles';

const RequireAuth = ({ allowedRoles }) => {
    const { user, isLoggedIn } = useSelector(state => state.persist.userAuthentication);
    const location = useLocation();
    
    if(isLoggedIn && (allowedRoles?.includes(roles.GUEST))) {
        return <Navigate to='/' />;
    }
    if(!isLoggedIn && (allowedRoles?.includes(roles.AUTHENTICATED))) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }
    if(isLoggedIn && !(user.type === roles.ADMIN) && (allowedRoles?.includes(roles.ADMIN))) {
        return <Navigate to='/'/>;
    }
    if(!isLoggedIn && (allowedRoles?.includes(roles.ADMIN))) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default RequireAuth;
