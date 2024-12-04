import React, { useState } from "react";
import ".styles/ForgotPassword.css"; // Import your CSS for styling

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("New Password:", newPassword);
        // Add your form submission logic here (e.g., API call)
    };

    return (
        <div className="forgot-password-container">
            <header className="header">
                <h1>StockEdge MK</h1>
            </header>
            <div className="form-container">
                <h2>Forgot Password</h2>
                <p>New Password</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hello@reallygreatsite.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="******"
                            required
                        />
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
