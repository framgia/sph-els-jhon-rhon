import React from 'react';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <React.Fragment>
            <Navbar />

            <Routes>
                <Route path="/" element="Home test 2" />
                <Route path="/categories" element="Categories" />
                <Route path="/login" element="Log-in" />
                <Route path="/logout" element="Logout" />
                <Route path="/register" element="Register" />
            </Routes>
        </React.Fragment>
    );
}

export default App;