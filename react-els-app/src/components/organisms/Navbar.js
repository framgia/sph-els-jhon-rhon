import React from 'react';
import { Link } from 'react-router-dom';

import ProtectedTags from '../templates/ProtectedTags';
import LogoutUser from '../molecules/LogoutUser';
import { roles } from '../../redux/roles';

const Navbar = () => {
    return (
        <nav className="container w-auto mx-auto bg-blue-300 py-6 px-60">
            <div className="flex flex-row justify-between">
                <Link to="/">
                    <div className="flex text-2xl">
                        E-Learning System
                    </div>
                </Link>
                <div className="flex flex-row space-x-10">
                    <ProtectedTags allowedRoles={[roles.AUTHENTICATED]}>
                        <Link to="/categories">Categories</Link>
                        <LogoutUser>Logout</LogoutUser>
                    </ProtectedTags>
                    <ProtectedTags allowedRoles={[roles.GUEST]}>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </ProtectedTags>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
