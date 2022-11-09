import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
    return (
        <React.Fragment>
            <Navbar />

            <Routes>
                <Route path="/" element="Home" />
                <Route path="/categories" element="Categories" />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element="Logout" />
                <Route path="/register" element={<Register />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;
