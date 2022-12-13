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
import AddWord from './pages/AddWord';
import Lesson from './pages/Lesson';
import EditWord from './pages/EditWord';
import Categories from './pages/Categories';
import Answer from './pages/Answer';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import WordsLearned from './pages/WordsLearned';
import LessonsLearned from './pages/LessonsLearned';

const App = () => {
    return (
        <React.Fragment>
            <Navbar />

            <Routes>
                <Route element={<RequireAuth allowedRoles={[roles.AUTHENTICATED]} />} >
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/:id/learned/words' element={<WordsLearned />} />
                    <Route path='/:id/learned/lessons' element={<LessonsLearned />} />
                </Route>
                     
                <Route element={<RequireAuth allowedRoles={[roles.STUDENT]} />} >
                    <Route path='/categories' element={<Categories />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.STUDENT]} />} >
                    <Route path='/categories/:id' element={<Answer />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.STUDENT]} />} >
                    <Route path='/categories/:id/results' element={<Results />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories' element={<AdminCategories />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories/add' element={<AddLesson />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories/:id' element={<Lesson />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories/:id/edit' element={<EditLesson />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories/:lessonId/words/add' element={<AddWord />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />} >
                    <Route path='/admin/categories/words/:id/edit' element={<EditWord />} />
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
