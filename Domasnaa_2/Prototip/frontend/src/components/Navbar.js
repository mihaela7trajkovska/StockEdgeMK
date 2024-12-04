import React from 'react';
import './Navbar.css'; // Додади CSS за стилизирање

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>StockEdge MK</h1>
            <ul>
                <li><a href="/">Dashboard home</a></li>
                <li><a href="/historical-data">Historical Data</a></li>
                <li><a href="/account">My Account</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
