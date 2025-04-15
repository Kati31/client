import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const res = await axios.get('http://localhost:5000/api/news');
            setNews(res.data);
        };
        fetchNews();
    }, []);

    return (
        <div className="news">
            <h1>Tin Tức Ẩm Thực</h1>
            <div className="news-list">
                {news.map(item => (
                    <div key={item._id} className="news-item">
                        <h3>{item.title}</h3>
                        <p>{item.content.substring(0, 100)}...</p>
                        <Link to={`/news/${item._id}`}>Đọc thêm</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;