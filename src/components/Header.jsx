import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          {/* <li><Link to="/products">Products</Link></li> */}
          <li><Link to="/cart">Cart ({totalQuantity})</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
