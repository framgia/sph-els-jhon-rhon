import { useSelector } from 'react-redux';

import { roles } from '../../redux/roles';

const ProtectedTags = ({ children, allowedRoles }) => {
    const { isLoggedIn } = useSelector(state => state.persist.userAuthentication);

    if(!isLoggedIn && (allowedRoles?.includes(roles.GUEST))) {
        return children;
    }
    if(isLoggedIn && (allowedRoles?.includes(roles.AUTHENTICATED))) {
        return children;
    }

    return;
}

export default ProtectedTags;
