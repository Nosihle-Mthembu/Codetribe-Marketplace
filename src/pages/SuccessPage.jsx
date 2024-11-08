import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import { useLocation } from 'react-router-dom';

function Success() {
  const [order, setOrder] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/checkout-session/${sessionId}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [location]);

  return (
    <div className="success-page">
      <h2>Thank You for Your Purchase!</h2>
      {order ? (
        <>
          <h3>Your Order Summary:</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </li>
            ))}
          </ul>
          <h4>Total: ${order.totalAmount}</h4>
        </>
      ) : (
        <p>Loading your order details...</p>
      )}
    </div>
  );
}

export default Success;
