import { useSelector } from 'react-redux';

import { roles } from '../../redux/roles';

const ProtectedTags = ({ children, allowedRoles }) => {
    const { user, isLoggedIn } = useSelector(state => state.persist.userAuthentication);

    if(!isLoggedIn && (allowedRoles?.includes(roles.GUEST))) {
        return children;
    }
    if(isLoggedIn && !(user.type === roles.ADMIN) && (allowedRoles?.includes(roles.AUTHENTICATED))) {
        return children;
    }
    if(isLoggedIn && user.type === roles.ADMIN && (allowedRoles?.includes(roles.ADMIN))) {
        return children;
    }

    return;
}

export default ProtectedTags;
