import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import CheckoutButton from './components/CheckoutButton';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/UpdateProduct';      // Assuming you have this component
import AddProduct from './pages/AddProduct';

function App() {

  const cartItems = useSelector(state => state.cart.items);
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/cancel' element={<CancelPage />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/checkout' element={<CheckoutButton items={cartItems} />} />
          <Route path="/products/:id/edit" element={<UpdateProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

