import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

interface Order {
  _id: string;
  quote?: {
    brand: string;
    model: string;
  };
  pickup?: {
    address: string;
    scheduledDate: string;
  };
  status: string;
  createdAt: string;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err: any) {
        setError('Failed to load orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h2>My Orders</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length === 0 && !error ? <p>No orders found.</p> : null}

      <ul>
        {orders.map((order) => (
          <li key={order._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <p><strong>Device:</strong> 
              {order.quote ? `${order.quote.brand} ${order.quote.model}` : 'N/A'}
            </p>
            <p><strong>Address:</strong> 
              {order.pickup?.address || 'N/A'}
            </p>
            <p><strong>Pickup Date:</strong> 
              {order.pickup?.scheduledDate ? new Date(order.pickup.scheduledDate).toLocaleDateString() : 'N/A'}
            </p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><small>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
