import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import loginImage from '../assets/login_image.png';
import '../styles/Login.css';
import {jwtDecode} from 'jwt-decode'

const Login = () => {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse) => {
        console.log("Token:", JSON.stringify(credentialResponse.credential));

        fetch('http://localhost:5000/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: credentialResponse.credential }),
        })
            .then(res => res.json())
            .then(console.log);
            
        const token = credentialResponse.credential
        const decoded = jwtDecode(token);

        const user = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
            googleId: decoded.sub,
        };

        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
    };

    const handleError = () => {
        alert('Đăng nhập thất bại!');
    };

    return (
        <div className="app-container">
            <div className="login-card">
                <img src={logo} alt="Logo" className="logo" />
                <h2 className="title">Đặt vé Bus</h2>
                <img src={loginImage} alt="Xe Bus" className="bus-image" />
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </div>
        </div>
    );
};

export default Login;
