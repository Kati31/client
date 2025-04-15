import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Cart = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [paymentMethod, setPaymentMethod] = useState('');

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const newCart = [...cart];
        newCart[index].quantity = newQuantity;
        updateCart(newCart);
    };

    const handleRemove = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        updateCart(newCart);
        setSelectedItems(selectedItems.filter(i => i !== index));
    };

    const handleSelectItem = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(i => i !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const handleSelectAll = () => {
        if (selectedItems.length === cart.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.map((_, index) => index));
        }
    };

    const handleRemoveSelected = () => {
        const newCart = cart.filter((_, index) => !selectedItems.includes(index));
        updateCart(newCart);
        setSelectedItems([]);
    };

    const handleOrder = async () => {
        if (!user) {
            alert('Vui lòng đăng nhập để đặt món!');
            navigate('/auth');
            return;
        }
        if (cart.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }
        if (!paymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán!');
            return;
        }
        try {
            const orderData = {
                userId: user._id,
                dishes: cart.map(item => ({
                    dishId: item.dishId,
                    quantity: item.quantity,
                })),
                address: user.address || 'Địa chỉ mặc định',
                paymentMethod,
            };
            const res = await axios.post('http://localhost:5000/api/orders', orderData);
            localStorage.removeItem('cart');
            navigate('/checkout', {
                state: {
                    dishes: cart,
                    paymentMethod,
                    orderId: res.data.orderId,
                },
            });
        } catch (error) {
            alert('Lỗi khi đặt hàng: ' + error.response?.data?.message);
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = 10000; // Phí giao hàng giả lập
    const total = subtotal + shippingFee;

    return (
        <div className="cart">
            <h1>Giỏ Hàng</h1>
            {cart.length === 0 ? (
                <p>Giỏ hàng trống. <Link to="/menu">Thêm món ngay!</Link></p>
            ) : (
                <>
                    <div className="cart-controls">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedItems.length === cart.length}
                                onChange={handleSelectAll}
                            />
                            Chọn tất cả
                        </label>
                        <button
                            onClick={handleRemoveSelected}
                            disabled={selectedItems.length === 0}
                            className="remove-selected"
                        >
                            Xóa đã chọn
                        </button>
                    </div>
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(index)}
                                    onChange={() => handleSelectItem(index)}
                                />
                                <img src={`/images/dishes/${item.image}`} alt={item.name} />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Giá: {item.price.toLocaleString('vi-VN')} ₫</p>
                                    <div className="quantity">
                                        <label>Số lượng:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                        />
                                    </div>
                                    <p>Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')} ₫</p>
                                    <button onClick={() => handleRemove(index)} className="remove-button">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <div className="summary-details">
                            <p>Tạm tính: {subtotal.toLocaleString('vi-VN')} ₫</p>
                            <p>Phí giao hàng: {shippingFee.toLocaleString('vi-VN')} ₫</p>
                            <h3>Tổng cộng: {total.toLocaleString('vi-VN')} ₫</h3>
                        </div>
                        <div className="payment-method">
                            <label>Phương thức thanh toán:</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="">Chọn phương thức</option>
                                <option value="Tiền mặt">Tiền mặt</option>
                                <option value="Thẻ ngân hàng">Thẻ ngân hàng</option>
                            </select>
                        </div>
                        <button onClick={handleOrder} className="order-button">Đặt Hàng</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;