/*
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        // Директно пренасочување на login
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister} className="register-form">
                <label htmlFor="email">EMAIL</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                />
                <label htmlFor="password">PASSWORD</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                />
                <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
                <input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm your password"
                    required
                />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import logo from '../../assets/logo.png'; // Импортирај го логото

const Register: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/login'); // Пренасочување на login
    };

    return (
        <div className="register-container">
            {/* Лого во левиот агол */}
            <div className="header">
                <img src={logo} alt="StockEdge MK Logo" className="register-logo" />
            </div>

            <h1>Register</h1>
            <form onSubmit={handleRegister} className="register-form">
                <label htmlFor="email">EMAIL</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                />
                <label htmlFor="password">PASSWORD</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                />
                <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
                <input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm your password"
                    required
                />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
