import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import RequireAuth from './components/templates/RequireAuth';
import { roles } from './redux/roles';
import AdminCategories from './pages/AdminCategories';
import AddLesson from './pages/AddLesson';
import EditLesson from './pages/EditLesson';

const App = () => {
    return (
        <React.Fragment>
            <Navbar />

            <Routes>
                <Route path='/' element='home' />
                <Route element={<RequireAuth allowedRoles={[roles.AUTHENTICATED]} />} >
                    <Route path='/categories' element='Categories' />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories' element={<AdminCategories />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories/add' element={<AddLesson />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories/:id/edit' element={<EditLesson />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.GUEST]} />} >
                    <Route path='/login' element={<Login />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.GUEST]} />} >
                    <Route path='/register' element={<Register />} />
                </Route>
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;
