import React, { useState, useEffect } from 'react';  
import { useParams } from 'react-router-dom';  
import axios from '../axiosInstance';  
import { useNavigate } from 'react-router-dom';  
  
function UpdateProduct() {  
  const { id } = useParams();
  const [product, setProduct] = useState({});  
  const navigate = useNavigate();  
  
  useEffect(() => {  
   const fetchProduct = async () => {  
    try {  
      const response = await axios.get(`http://localhost:5000/products/${id}`);  
      setProduct(response.data);  
    } catch (error) {  
      console.error('Error fetching product:', error);  
      alert('Failed to fetch product details');  
    }  
   };  
   fetchProduct();  
  }, [id]);  
  
  const handleSubmit = async (e) => {  
   e.preventDefault();  
  
   try {  
    const response = await axios.put(`http://localhost:5000/products/${id}`, product, {  
      headers: {  
       'Content-Type': 'application/json',  
      },  
    });  
    console.log('Product updated:', response.data);  
    navigate(`/products/${id}`);  
   } catch (error) {  
    console.error('Error updating product:', error);  
    alert('Failed to update product');  
   }  
  };  
  
  const handleChange = (e) => {  
   const { name, value } = e.target;  
   setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));  
  };  
  
  return (  
   <div>  
    <h2>Update Product</h2>  
    <form onSubmit={handleSubmit}>  
      <label>  
       Name:  
       <input  
        type="text"  
        name="name"  
        value={product.name || ''}  
        onChange={handleChange}  
        required  
       />  
      </label>  
      <label>  
       Price:  
       <input  
        type="number"  
        name="price"  
        value={product.price || ''}  
        onChange={handleChange}  
        required  
       />  
      </label>  
      <label>  
       Description:  
       <textarea  
        name="description"  
        value={product.description || ''}  
        onChange={handleChange}  
        required  
       />  
      </label>  
      <label>  
       Image URL:  
       <input  
        type="text"  
        name="image"  
        value={product.image || ''}  
        onChange={handleChange}  
        required  
       />  
      </label>  
      <button type="submit">Update Product</button>  
    </form>  
   </div>  
  );  
}  
  
export default UpdateProduct;
