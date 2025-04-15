import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        order: '',
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Họ và tên không được để trống';
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
            newErrors.email = 'Email không hợp lệ';
        if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = 'Số điện thoại phải là 10 số';
        if (!formData.message) newErrors.message = 'Lời nhắn không được để trống';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/contacts', formData);
            setMessage('Gửi liên hệ thành công!');
            setFormData({ fullName: '', email: '', phone: '', message: '', order: '' });
            setErrors({});
        } catch (error) {
            setMessage('Lỗi: ' + error.response?.data?.message || 'Đã xảy ra lỗi');
        }
    };

    return (
        <div className="contact">
            <h1>Liên Hệ Với Chúng Tôi</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>Họ và Tên</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Nhập họ và tên"
                    />
                    {errors.fullName && <p className="error">{errors.fullName}</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Nhập email"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Số Điện Thoại</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
                <div className="form-group">
                    <label>Lời Nhắn</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Viết lời nhắn của bạn"
                    />
                    {errors.message && <p className="error">{errors.message}</p>}
                </div>
                <div className="form-group">
                    <label>Đặt Món (nếu có)</label>
                    <input
                        type="text"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        placeholder="Tên món muốn đặt"
                    />
                </div>
                <button type="submit">Gửi Liên Hệ</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Contact;