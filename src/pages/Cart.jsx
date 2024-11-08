import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart, addToCart } from '../redux/cartSlice';
import { Navigate } from 'react-router-dom';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const [redirectToCheckout, setRedirectToCheckout] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  console.log("Cart Items:", cartItems);
  
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  
  const handleProceedToCheckout = () => {
    setRedirectToCheckout(true); 
  };

  if (redirectToCheckout) {
    return <Navigate to="/checkout" />;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <h4>{item.name}</h4>
                <p>Price: R{item.price}</p>
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <p type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                >Quantity: {item.quantity}</p>
                <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                <p>Total: R{item.totalPrice}</p>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total Amount: R{totalAmount}</h3>
          <div>
            <h2>Total: R{calculateTotal()}</h2>
            <button onClick={handleClearCart}>Clear Cart</button>
          </div>
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
