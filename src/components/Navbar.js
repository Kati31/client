import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Ẩm Thực Truyền Thống
            </Link>
            <ul>
                <li><Link to="/">Trang Chủ</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/contact">Liên Hệ</Link></li>
                <li>
                    <Link to="/cart" className="cart-icon">
                        Giỏ hàng ({cartCount})
                    </Link>
                </li>
                {user ? (
                    <li className="user-menu">
                        <span>Xin chào, {user.username}</span>
                        <div className="logout-menu">
                            <button onClick={handleLogout}>Đăng Xuất</button>
                        </div>
                    </li>
                ) : (
                    <li><Link to="/auth">Đăng Nhập</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;