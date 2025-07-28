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
  user?: {
    name: string;
    email: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      setError('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/admin/orders/${orderId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders(); // refresh
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 gap-6">
        {orders.map(order => (
          <div key={order._id} className="border border-gray-300 p-4 rounded-lg shadow-sm">
            <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
            <p><strong>Device:</strong> {order.quote ? `${order.quote.brand} ${order.quote.model}` : 'N/A'}</p>
            <p><strong>Pickup:</strong> {order.pickup?.address || 'N/A'} - {order.pickup?.scheduledDate ? new Date(order.pickup.scheduledDate).toLocaleDateString() : ''}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <select
              className="mt-2 border border-gray-300 px-2 py-1 rounded"
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
