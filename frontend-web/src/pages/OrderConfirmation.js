import React from 'react';
import { useLocation } from 'react-router-dom';


const OrderConfirmation = () => {
    const location = useLocation ();
    const { order } = location.state || {};

    if (!order) {
        return <p>No order details found.</p>;
    }

    return (
        <div className='order-confirmation'>
            <h2>Order Confirmation</h2>
            <p>Thank you for you purchase!</p>
            <h3>Order Summary</h3>
            <ul>
                {order.items.map((item) => (
                    <li key={item.productId}>
                        {item.quantity} x {item.productId.title} - ${item.productId.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <h3>Total: ${order.totalAmount.toFixed(2)}</h3>
        </div>
    );
};

export default OrderConfirmation;