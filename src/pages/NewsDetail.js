import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const fetchNewsItem = async () => {
            const res = await axios.get(`http://localhost:5000/api/news/${id}`);
            setNewsItem(res.data);
        };
        fetchNewsItem();
    }, [id]);

    if (!newsItem) return <div>Loading...</div>;

    return (
        <div className="news-detail">
            <h1>{newsItem.title}</h1>
            <p>{new Date(newsItem.date).toLocaleDateString('vi-VN')}</p>
            <p>{newsItem.content}</p>
        </div>
    );
};

export default NewsDetail;