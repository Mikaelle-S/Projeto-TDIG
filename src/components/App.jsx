import React from 'react'

import { BrowserRouter, Route, Routes,} from "react-router-dom";

import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/Login';
import RegisterUser from './pages/RegisterUserPage/RegisterUser';
import AuthProvider from "./AuthProvider";
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

import './App.css';

const App = () =>(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route exact path="/login"  element={<Login/>}/>
                <Route exact path="/registerUser" element={<RegisterUser/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="*" element={<NotFound/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);
export default App;