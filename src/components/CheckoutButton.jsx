import axios from "axios";

function CheckoutButton({ items }) {
    const handleCheckout = async () => {
      if (!items || items.length === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:5000/create-checkout-session', { items });
        window.location.href = response.data.url;
      } catch (error) {
        console.error("Checkout error:", error);
        alert("Something went wrong during checkout. Please try again later.");
      }
    };
  
    return <button onClick={handleCheckout}>Checkout</button>;
  }

export default CheckoutButton