import React, { useContext } from 'react';
import Navbar from './components/organisms/Navbar';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import AuthContext from './context/AuthProvider';

const App = () => {
    const { auth } = useContext(AuthContext); 
    return (
        <React.Fragment>
            <Navbar />

            <Routes>
                <Route path="/" element={console.log(auth)} />
                <Route path="/categories" element="Categories" />
                <Route path="/login" element="Log-in" />
                <Route path="/logout" element="Logout" />
                <Route path="/register" element={<Register />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;
