

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import logo from '../../assets/logo.png';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:9090/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || "Login failed");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            localStorage.setItem("token", data.token);
            alert("Login successful!");

            // Пренасочување кон Dashboard
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Login error:", err.message);
            setError(err.message || "An unexpected error occurred");
        }
    };

    return (
        <>
            <div className="header">
                <img src={logo} alt="StockEdge MK Logo" />
            </div>
            <div className="login-container">
                <div className="login-box">
                    <h1>Login</h1>
                    <p>Sign in to continue</p>
                    <form onSubmit={handleLogin} className="login-form">
                        <label htmlFor="email">EMAIL</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">PASSWORD</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error">{error}</p>}
                        <div className="login-links">
                            <Link to="/register" className="register-link">Don't have an account?</Link>
                            <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
                        </div>
                        <button type="submit" className="login-button" onClick={() => navigate("/dashboard")}>Log In</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginForm;


