import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
    const { isLoggedIn } = useSelector(state => state.persist.userAuthentication);
    const location = useLocation();
    
    if(isLoggedIn && (allowedRoles === 'guest')) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    if(!isLoggedIn && (allowedRoles === 'authenticated')) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default RequireAuth;
