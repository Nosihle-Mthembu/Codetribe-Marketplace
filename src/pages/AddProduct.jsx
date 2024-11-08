import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      alert('Please enter a valid price');
      return;
    }
  
    const newProduct = {
      name,
      price: parsedPrice,
      description,
      image,
    };
  
    console.log("New product details:", newProduct);
    console.log("Token being sent:", token);
  
    try {
      const response = await axios.post('/products', newProduct, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log("Product added:", response.data);
      alert('Product added successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error.response || error.message);
      alert('There was an error adding the product.');
    }
  };
  
  
  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
