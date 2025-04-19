import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Menu = () => {
    const [dishes, setDishes] = useState([]);
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/dishes');
                setDishes(res.data);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };
        fetchDishes();
    }, []);
    
    const filteredDishes = category ? dishes.filter(d => d.category === category) : dishes;

    const sortedDishes = [...filteredDishes].sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
    });

    const handleSelectDish = (dish) => {
        setSelectedDish(dish);
        setQuantity(1);
    };

    const addToCart = (dish, qty = 1) => {
        if (!user) {
            alert('Vui lòng đăng nhập để thêm món vào giỏ hàng!');
            navigate('/auth');
            return;
        }
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.dishId === dish._id);
        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.push({
                dishId: dish._id,
                name: dish.name,
                image: dish.image,
                price: dish.price,
                quantity: qty,
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${dish.name} đã được thêm vào giỏ hàng!`);
        setSelectedDish(null);
        setQuantity(1);
    };

    const suggestDish = () => {
        if (dishes.length > 0) {
            const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
            setSelectedDish(randomDish);
            setQuantity(1);
        }
    };

    return (
        <div className="menu">
            <nav className="breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span className="separator"></span>
                <span>Ẩm thực truyền thống</span>
                {selectedDish && (
                    <>
                        <span className="separator">→</span>
                        <span>{selectedDish.name}</span>
                    </>
                )}
            </nav>
            <h1>Menu Món Ăn</h1>
            <div className="menu-controls">
                <button onClick={suggestDish} className="suggest-button">Món Gợi Ý Hôm Nay</button>
                <div className="filters">
                    <select onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="">Tất cả</option>
                        <option value="Bắc">Miền Bắc</option>
                        <option value="Trung">Miền Trung</option>
                        <option value="Nam">Miền Nam</option>
                    </select>
                    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                        <option value="">Sắp xếp</option>
                        <option value="price-asc">Giá: Thấp đến Cao</option>
                        <option value="price-desc">Giá: Cao đến Thấp</option>
                    </select>
                </div>
            </div>
            <div className="menu-content">
                <div className="dish-list">
                    {sortedDishes.map(dish => (
                        <div
                            key={dish._id}
                            className={`dish-item ${selectedDish?._id === dish._id ? 'selected' : ''}`}
                        >
                            <div className="dish-card" onClick={() => handleSelectDish(dish)}>
                            <img src={dish.image} alt={dish.name} loading="lazy" />
                                <h3>{dish.name}</h3>
                                <p className="price">{dish.price.toLocaleString('vi-VN')} ₫</p>
                            </div>
                            <button
                                className="quick-add"
                                onClick={() => addToCart(dish)}
                            >
                                Thêm nhanh
                            </button>
                        </div>
                    ))}
                </div>
                {selectedDish && (
                    <div className="dish-detail">
                        <h2>{selectedDish.name}</h2>
                        <p className="description">{selectedDish.description}</p>
                        <p className="history">
                            <strong>Lịch sử:</strong> {selectedDish.history}
                        </p>
                        <div className="order-section">
                            <p className="price">{selectedDish.price.toLocaleString('vi-VN')} ₫</p>
                            <div className="quantity">
                                <label>Số lượng:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                            </div>
                            <button onClick={() => addToCart(selectedDish, quantity)}>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;