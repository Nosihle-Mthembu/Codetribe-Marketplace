import React from 'react';
import axios from '../axiosInstance';

function ProductCard({ product }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${product.id}`);
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
}

export default ProductCard;
