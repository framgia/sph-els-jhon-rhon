import React from 'react';
import { Link } from 'react-router-dom';

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
                    <Link to="/categories">Categories</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/logout">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
