import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
    const { getCartCount } = useCart();

    return (
        <nav style={{ background: "#f8f9fa", padding: "10px", display: "flex", gap: "20px" }}>
            <Link to="/">Trang chủ</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/cart">Giỏ hàng ({getCartCount()})</Link>
            <Link to="/contact">Liên hệ</Link>
        </nav>
    );
};

export default Header;