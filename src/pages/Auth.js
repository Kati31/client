import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/login' : '/register';
            const res = await axios.post(`http://localhost:5000/api/users${endpoint}`, formData);
            setMessage(res.data.message);
            if (isLogin) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/');
            } else {
                setIsLogin(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Đã xảy ra lỗi');
        }
    };

    return (
        <div className="auth">
            <h1>{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                    <div className="form-group">
                        <label>Tên Người Dùng</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Nhập tên người dùng"
                            required={!isLogin}
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Nhập email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật Khẩu</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label>Địa Chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Nhập địa chỉ"
                        />
                    </div>
                )}
                <button type="submit">{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p>
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                <button
                    type="button"
                    className="switch-auth"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage('');
                        setFormData({ username: '', email: '', password: '', address: '' });
                    }}
                >
                    {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                </button>
            </p>
        </div>
    );
};

export default Auth;