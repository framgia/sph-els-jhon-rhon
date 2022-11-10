import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProtectedTags from '../templates/ProtectedTags';

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
                    <ProtectedTags allowedRoles='authenticated'>
                        <Link to="/categories">Categories</Link>
                        <Link to="/logout">Logout</Link>
                    </ProtectedTags>
                    <ProtectedTags allowedRoles='guest'>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </ProtectedTags>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
