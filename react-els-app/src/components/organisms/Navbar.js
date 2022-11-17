import React from 'react';
import { Link } from 'react-router-dom';

import ProtectedTags from '../templates/ProtectedTags';
import LogoutUser from '../molecules/LogoutUser';
import { roles } from '../../redux/roles';

const Navbar = () => {
    return (
        <nav className='w-full mx-auto bg-blue-300 py-6 px-5 lg:px-60'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row space-x-1 lg:space-x-5'>
                    <Link to='/'>
                        <div className='flex text-center lg:text-left w-32 lg:w-auto text-2xl'>
                            E-Learning System
                        </div>
                    </Link>
                    <ProtectedTags allowedRoles={[roles.ADMIN]}>
                        <div className='flex items-center'>|</div>
                        <div className='flex items-center'>Admin</div>
                    </ProtectedTags>
                </div>
                <div className='flex flex-col lg:flex-row space-x-10 items-center'>
                    <ProtectedTags allowedRoles={[roles.ADMIN]}>
                    <Link to='/admin/categories'>Categories</Link>
                    </ProtectedTags>
                    <ProtectedTags allowedRoles={[roles.AUTHENTICATED]}>
                        <Link to='/categories'>Categories</Link>
                    </ProtectedTags>
                    <ProtectedTags allowedRoles={[roles.AUTHENTICATED, roles.ADMIN]}>
                        <LogoutUser>Logout</LogoutUser>
                    </ProtectedTags>
                    <ProtectedTags allowedRoles={[roles.GUEST]}>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </ProtectedTags>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
