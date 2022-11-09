import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import Register from './pages/Register';

const App = () => {
    return (
        <React.Fragment>
            <Navbar />

            <Routes>
                <Route path="/" element="Home" />
                <Route path="/categories" element="Categories" />
                <Route path="/login" element="Log-in" />
                <Route path="/logout" element="Logout" />
                <Route path="/register" element={<Register />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;
