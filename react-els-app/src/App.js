import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import RequireAuth from './components/templates/RequireAuth';

const App = () => {

    return (
        <React.Fragment>
            <Navbar />

            <Routes>
                <Route path="/" element="home" />
                <Route element={<RequireAuth allowedRoles='authenticated' />} >
                    <Route path="/categories" element="Categories" />
                </Route>
                <Route element={<RequireAuth allowedRoles='guest' />} >
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/logout" element="Logout" />
                <Route element={<RequireAuth allowedRoles='guest' />} >
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </React.Fragment>
    );
}

export default App;
