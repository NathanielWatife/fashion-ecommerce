import React, { useEffect, useState } from "react";
import api from '../services/api';


const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders'); // fetch orders from logged in user
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (orders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div className="order-history">
            <h2>Your Orders</h2>
            {orders.map((order) => (
                <div key={order._id} className="order">
                    <h3>Order ID: {order._id}</h3>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <ul>
                        {order.items.map((item) => (
                            <li key={item.productId._id}>
                                {item.quantity} x {item.productId.title} - ${item.productId.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${order.totalAmount.toFixed(2)}</h3>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
