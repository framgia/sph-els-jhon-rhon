import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { roles } from "../../redux/roles";

const RequireAuth = ({ allowedRoles }) => {
    const { isLoggedIn } = useSelector(state => state.persist.userAuthentication);
    const location = useLocation();
    
    if(isLoggedIn && (allowedRoles?.includes(roles.GUEST))) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    if(!isLoggedIn && (allowedRoles?.includes(roles.AUTHENTICATED))) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default RequireAuth;
