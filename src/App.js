import React from 'react';
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
import './App.css';
import 'animate.css';

const Search = () => <div className="search"><h1>Tìm Kiếm</h1><p>Chức năng tìm kiếm đang phát triển...</p></div>;
const Terms = () => <div className="terms"><h1>Điều Khoản Dịch Vụ</h1><p>Điều khoản sẽ được cập nhật sau...</p></div>;

function App() {
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;