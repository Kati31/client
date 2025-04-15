import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { dishes, paymentMethod, orderId } = location.state || {};
    const user = JSON.parse(localStorage.getItem('user'));
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (paymentMethod === 'Tiền mặt') {
            setMessage('Đơn hàng đã được xác nhận! Thanh toán khi nhận hàng.');
            setTimeout(() => navigate('/'), 2000);
            return;
        }
        setMessage('Thanh toán thành công qua ngân hàng!');
        setTimeout(() => navigate('/'), 2000);
    };

    if (!dishes || !orderId) return <div>Không có món được chọn!</div>;

    const total = dishes.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="checkout">
            <h1>Thanh Toán</h1>
            <div className="order-summary">
                <h3>Đơn Hàng</h3>
                {dishes.map((dish, index) => (
                    <div key={index}>
                        <p>Món: {dish.name}</p>
                        <p>Số lượng: {dish.quantity}</p>
                        <p>Tổng: {(dish.price * dish.quantity).toLocaleString('vi-VN')} ₫</p>
                    </div>
                ))}
                <p>Tổng cộng: {total.toLocaleString('vi-VN')} ₫</p>
                <p>Phương thức: {paymentMethod}</p>
            </div>
            {paymentMethod === 'Thẻ ngân hàng' ? (
                <div className="bank-info">
                    <h3>Thông tin thanh toán</h3>
                    <p>Ngân hàng: Vietcombank</p>
                    <p>Số tài khoản: 1013021361</p>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_vietcombank.png"
                        alt="Vietcombank"
                        className="bank-logo"
                    />
                    <p>Vui lòng chuyển khoản và xác nhận đơn hàng.</p>
                    <form onSubmit={handleSubmit} className="payment-form">
                        <button type="submit">Xác nhận thanh toán</button>
                    </form>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="payment-form">
                    <p>Đơn hàng sẽ được giao đến: {user ? user.address : 'Địa chỉ mặc định'}</p>
                    <button type="submit">Xác nhận đơn hàng</button>
                </form>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Checkout;