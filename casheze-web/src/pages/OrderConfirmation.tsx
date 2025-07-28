import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

interface Pickup {
  _id: string;
  quote: {
    _id: string;
    brand: string;
    model: string;
  };
  address: string;
  scheduledDate: string;
}

const OrderConfirmation: React.FC = () => {
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/pickups', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPickups(res.data);
      } catch (err: any) {
        setError('Failed to load pickups');
      }
    };

    fetchPickups();
  }, []);

  const handleConfirm = async (quoteId: string, pickupId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/orders', { quoteId, pickupId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Order confirmed successfully!');
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Order confirmation failed');
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h2>Confirm Your Order</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {pickups.map((pickup) => (
  <div key={pickup._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
    <p><strong>Device:</strong> 
      {pickup.quote ? `${pickup.quote.brand} ${pickup.quote.model}` : 'Quote data not available'}
    </p>
    <p><strong>Pickup Date:</strong> {new Date(pickup.scheduledDate).toLocaleDateString()}</p>

    {pickup.quote ? (
      <button onClick={() => handleConfirm(pickup.quote._id, pickup._id)}>
        Confirm Order
      </button>
    ) : (
      <button disabled style={{ opacity: 0.6 }}>Cannot confirm (quote missing)</button>
    )}
  </div>
))}

    </div>
  );
};

export default OrderConfirmation;
