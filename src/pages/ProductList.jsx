import React, { useEffect, useState } from 'react';  
import axios from '../axiosInstance';  
import { Link } from 'react-router-dom';  
import CheckoutButton from '../components/CheckoutButton';  
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';



function ProductList() {  
  const [products, setProducts] = useState([]);  
    const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);  
  
  useEffect(() => {  
   const fetchProducts = async () => {  
    try {  
      const response = await axios.get('/products');  
      setProducts(response.data);  
    } catch (error) {  
      console.error("Error fetching products:", error);  
    }  
   };  
   fetchProducts();  
  }, []);  
  
  const toggleVisibility = async (id, isHidden) => {  
   try {  
    
    await axios.put(`http://localhost:5000/products/${id}/hide`, {}, {  
      headers: {  
       'Content-Type': 'application/json',  
      }  
    });  
      
     
    setProducts(prevProducts =>  
      prevProducts.map(product =>  
       product.id === id ? { ...product, isHidden: !isHidden } : product  
      )  
    );  
   } catch (error) {  
    console.error("Error hiding/unhiding product:", error);  
   }  
  };  
  
  const editProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      const productData = response.data;
      navigate(`/products/${id}/edit`);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  
  
  const deleteProduct = async (id) => {  
   try {  
    await axios.delete(`http://localhost:5000/products/${id}`);   
    setProducts(prevProducts =>  
      prevProducts.filter(product => product.id !== id)  
    );  
   } catch (error) {  
    console.error("Error deleting product:", error);  
   }  
  };  
  
  return (  
   <div className="product-list">  
    <h2>All Products</h2>  
    <div className="products-grid">  
      {products.map((product) => (  
       <div key={product.id} className="product-card">  
        <div style={{ display: product.isHidden ? 'none' : 'block' }}>  
          <Link to={`/products/${product.id}`}>  
           <img src={product.image} alt={product.name} />  
           <h3>{product.name}</h3>  
           <p>R{product.price}</p>  
          </Link>  
        </div>  
        <div>  
          <button onClick={() => toggleVisibility(product.id, product.isHidden)}>  
           {product.isHidden ? 'Show Product' : 'Hide Product'}  
          </button>  
          <button onClick={() => editProduct(product.id)}>Edit</button>  
          <button onClick={() => deleteProduct(product.id)}>Delete</button>  
        </div>  
       </div>  
      ))}  
    </div>  
    <Link to="/add-product">  
      <button>Add New Product</button>  
    </Link>  
    <CheckoutButton items={cartItems} />  
   </div>  
  );  
}  
  
export default ProductList;
