import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const Admin = () => {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

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
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/dishes/${id}`);
      setDishes(dishes.filter(d => d._id !== id));
    } catch (err) {
      console.error('Failed to delete dish:', err);
    }
  };

  const handleUpdateDish = async (updatedDish) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/dishes/${updatedDish._id}`, updatedDish);
      setDishes(dishes.map(d => (d._id === updatedDish._id ? res.data : d)));
      setSelectedDish(null); // Đóng modal sau khi cập nhật thành công
    } catch (err) {
      console.error('Failed to update dish:', err);
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/dishes', newDish);
      setDishes([...dishes, res.data]);
      setNewDish({ name: '', price: '', description: '', category: '', image: '' }); // Reset form
    } catch (err) {
      console.error('Failed to add dish:', err);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Quản lý món ăn</h2>

      <div className="filter-bar">
        <select onChange={e => setCategory(e.target.value)}>
          <option value="">Tất cả loại món</option>
          <option value="Món chính">Món chính</option>
          <option value="Khai vị">Khai vị</option>
          <option value="Tráng miệng">Tráng miệng</option>
        </select>

        <select onChange={e => setSortBy(e.target.value)}>
          <option value="">Sắp xếp</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>

      <form className="add-dish-form" onSubmit={handleAddDish}>
        <h3>Thêm món ăn mới</h3>
        <label>
          Tên món:
          <input
            type="text"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            required
          />
        </label>
        <label>
          Giá:
          <input
            type="number"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: parseFloat(e.target.value) })}
            required
          />
        </label>
        <label>
          Mô tả:
          <textarea
            value={newDish.description}
            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
            required
          />
        </label>
        <label>
          Loại món:
          <input
            type="text"
            value={newDish.category}
            onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
            required
          />
        </label>
        <label>
          Hình ảnh (URL):
          <input
            type="text"
            value={newDish.image}
            onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
          />
        </label>
        <button type="submit">Thêm món</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên món</th>
            <th>Loại món</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedDishes.map(dish => (
            <tr key={dish._id}>
              <td><img src={dish.image} alt={dish.name} className="image" /></td>
              <td>{dish.name}</td>
              <td>{dish.category}</td>
              <td className="price">{dish.price.toLocaleString()} VND</td>
              <td>{dish.description}</td>
              <td className="actions">
                <button onClick={() => handleSelectDish(dish)}>Sửa</button>
                <button onClick={() => handleDelete(dish._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDish && (
        <div className="modal">
          <h3>Chỉnh sửa món: {selectedDish.name}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateDish(selectedDish);
            }}
          >
            <label>
              Tên món:
              <input
                type="text"
                value={selectedDish.name}
                onChange={(e) => setSelectedDish({ ...selectedDish, name: e.target.value })}
              />
            </label>
            <label>
              Giá:
              <input
                type="number"
                value={selectedDish.price}
                onChange={(e) => setSelectedDish({ ...selectedDish, price: parseFloat(e.target.value) })}
              />
            </label>
            <label>
              Mô tả:
              <textarea
                value={selectedDish.description}
                onChange={(e) => setSelectedDish({ ...selectedDish, description: e.target.value })}
              />
            </label>
            <button type="submit">Lưu</button>
            <button type="button" onClick={() => setSelectedDish(null)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
