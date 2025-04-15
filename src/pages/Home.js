import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Home = () => {
    const [contactData, setContactData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });
    const [message, setMessage] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { name: 'Phở Bò Hà Nội', image: '/images/dishes/pho-bo.jpg' },
        { name: 'Bún Bò Huế', image: '/images/dishes/bun-bo-hue.jpg' },
        { name: 'Bánh Xèo Miền Tây', image: '/images/dishes/banh-xeo.jpg' },
        { name: 'Cơm Tấm Sài Gòn', image: '/images/dishes/com-tam.jpg' },
        { name: 'Bún Riêu Cua', image: '/images/dishes/bun-rieu.jpg' },
    ];

    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contacts', contactData);
            setMessage('Gửi lời nhắn thành công!');
            setContactData({ fullName: '', email: '', phone: '', message: '' });
        } catch (error) {
            setMessage('Lỗi: ' + error.response?.data?.message || 'Đã xảy ra lỗi');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="home">
            <section className="banner">
                <h1>Ẩm Thực Truyền Thống</h1>
                <p>Thưởng thức tinh hoa ẩm thực ba miền Bắc – Trung – Nam</p>
                <Link to="/menu" className="cta-button">Khám Phá Ngay</Link>
            </section>

            <section className="intro">
                <h2>Chuyện Ẩm Thực Việt</h2>
                <p>
                    Ẩm thực Việt Nam là khúc hát đồng quê, là mùi thơm nồng nàn từ nồi nước dùng phở sáng sớm, là tiếng xèo xèo của bánh xèo trên chảo nóng. Đó là tình yêu của mẹ gói trong từng chiếc bánh chung xanh, là ký ức tuổi thơ bên bát canh chua cá lóc ngọt lành. Chúng tôi mang đến những món ăn không chỉ ngon miệng, mà còn đậm hồn Việt, để mỗi bữa ăn là một hành trình trở về cội nguồn.
                </p>
            </section>

            <section className="slideshow">
                <h2>Món Ngon Ba Miền</h2>
                <div className="slideshow-container">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                        >
                            <img src={slide.image} alt={slide.name} className="slide-image" />
                            <div className="caption">{slide.name}</div>
                        </div>
                    ))}
                    <button className="prev" onClick={prevSlide}>❮</button>
                    <button className="next" onClick={nextSlide}>❯</button>
                    <div className="dots">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <div className="services">
                        <h3>Dịch Vụ Khách Hàng</h3>
                        <ul>
                            <li><Link to="/search">Tìm Kiếm</Link></li>
                            <li><a href="#intro">Giới Thiệu</a></li>
                            <li><Link to="/terms">Điều Khoản Dịch Vụ</Link></li>
                            <li><Link to="/contact">Liên Hệ</Link></li>
                        </ul>
                    </div>
                    <div className="contact-form">
                        <h3>Để Lại Lời Nhắn</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Họ và Tên"
                                value={contactData.fullName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={contactData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={contactData.phone}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                title="Số điện thoại phải là 10 chữ số"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Lời nhắn của bạn"
                                value={contactData.message}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Gửi Lời Nhắn</button>
                        </form>
                        {message && <p className="message">{message}</p>}
                    </div>
                    <div className="contact-info">
                        <h3>Thông Tin Liên Hệ</h3>
                        <p>Địa chỉ: 28 Âu Cơ, Phường 5, Quận 11</p>
                        <p>Số điện thoại: 0928372538</p>
                        <p>Email: amthuctruyenthong@gmail.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;