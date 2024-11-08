import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h4>Order ID: {order._id}</h4>
              <p>Total: ${order.totalAmount}</p>
              <p>Status: {order.paymentStatus}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;
