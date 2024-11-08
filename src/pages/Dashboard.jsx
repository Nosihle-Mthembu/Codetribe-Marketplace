import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <ProductList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
