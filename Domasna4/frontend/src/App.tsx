import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login/LoginForm.tsx';
import RegisterForm from './pages/Register/RegisterForm.tsx';
import ForgotPassword from './pages/NewPassword/ForgotPassword.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;