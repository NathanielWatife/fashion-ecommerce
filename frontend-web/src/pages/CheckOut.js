import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_your_publishable_key'); // Replace with your Stripe publishable key

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const initialValues = {
    name: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
  });

  const handleCheckoutSubmit = (values) => {
    console.log('Shipping Details:', values);
    // Save shipping details if needed
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.title} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
      </div>

      {/* Shipping Form */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCheckoutSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Full Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Field name="address" type="text" />
              <ErrorMessage name="address" component="div" />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <Field name="city" type="text" />
              <ErrorMessage name="city" component="div" />
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <Field name="postalCode" type="text" />
              <ErrorMessage name="postalCode" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>Save Shipping Details</button>
          </Form>
        )}
      </Formik>

      {/* Stripe Payment Form */}
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
};

export default Checkout;
