import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import api from '../services/api';

const CheckoutForm = ({ totalAmount }) => {
  const cartItems = useSelector((state) => state.cart.items); // Fetch cart items
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      // Request a Payment Intent from the backend
      const { data } = await api.post('/payment/create-payment-intent', { amount: totalAmount * 100 });
      const clientSecret = data.clientSecret;

      // Confirm the payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: 'Customer' }, // Optional: Replace with user's name
        },
      });

      if (error) {
        setPaymentStatus('Payment failed: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful!');

        // Save order in the backend
        const orderDetails = {
          items: cartItems,
          totalAmount,
        };
        await api.post('/orders', orderDetails);

        // Redirect to Order Confirmation page
        navigate('/order-confirmation', { state: { order: orderDetails } });
      }
    } catch (err) {
      setPaymentStatus('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${totalAmount}`}
      </button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </form>
  );
};

export default CheckoutForm;