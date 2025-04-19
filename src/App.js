import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import 'animate.css';

const Search = () => <div className="search"><h1>Tìm Kiếm</h1><p>Chức năng tìm kiếm đang phát triển...</p></div>;
const Terms = () => <div className="terms"><h1>Điều Khoản Dịch Vụ</h1><p>Điều khoản sẽ được cập nhật sau...</p></div>;

function App() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));
    const [isAdmin, setIsAdmin] = useState(user.role === 'admin');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user) {
            setIsAuthenticated(true); // Người dùng đã đăng nhập
            setIsAdmin(user.role === 'admin'); // Kiểm tra vai trò admin
        }
    }, []);
console.log(isAuthenticated, isAdmin);

    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:id" element={<NewsDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    {/* Bảo vệ route admin */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}/>
                        }
                    >
                        <Route path="/admin" element={<Admin/>}/>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;