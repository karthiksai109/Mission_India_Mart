

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
    const navigate = useNavigate();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Clear previous error
        setError('');
        setSuccess(false);

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fname, lname, email, address, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(true);
            navigate('/login'); // Redirect to login page upon success
        } else {
            setError(data.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="Body">
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-header">Welcome to IndiaMart</h1>
                    <p className="login-subtitle">Create your account to start shopping</p>
                    {error && <p  className="error-message">{error}</p>}
                    {success && <p className="success-message">Registration successful! Redirecting...</p>}
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <label htmlFor="fname">First Name</label>
                            <input
                                type="text"
                                id="fname"
                                placeholder="Enter your first name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lname">Last Name</label>
                            <input
                                type="text"
                                id="lname"
                                placeholder="Enter your last name"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Register</button>
                    </form>
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => navigate('/login')} className="link">
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

