import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/logo.png';
import loginImage from '../assests/login_image.png';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse) => {
        console.log('Login Success:', credentialResponse);
        alert('Đăng nhập thành công!');
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
