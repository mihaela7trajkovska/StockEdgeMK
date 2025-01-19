import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar: React.FC = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <Link to="/dashboard" className="navbar-title">StockEdge MK</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li className="dropdown" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                    <span>My Account</span>
                    {isDropdownVisible && (
                        <ul className="dropdown-content">
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
