import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import RequireAuth from './components/templates/RequireAuth';
import { roles } from './redux/roles';

const App = () => {
    return (
        <React.Fragment>
            <Navbar />

            <Routes>
                <Route path="/" element="home" />
                <Route element={<RequireAuth allowedRoles={[roles.AUTHENTICATED]} />} >
                    <Route path="/categories" element="Categories" />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.GUEST]} />} >
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.GUEST]} />} >
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;
