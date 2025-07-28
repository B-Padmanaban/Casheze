import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

interface Pickup {
  _id: string;
  quote: {
    brand: string;
    model: string;
  };
  address: string;
  scheduledDate: string;
  status: string;
  createdAt: string;
}

const MyPickups: React.FC = () => {
  const [pickups, setPickups] = useState<Pickup[]>([]);
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

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h2>My Pickups</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pickups.length === 0 && !error ? <p>No pickups found.</p> : null}
      <ul>
        {
         pickups.map((pickup) => (
           <li key={pickup._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <p><strong>Device:</strong> 
            {pickup.quote ? `${pickup.quote.brand} ${pickup.quote.model}` : 'Quote data unavailable'}
            </p>
            <p><strong>Address:</strong> {pickup.address}</p>
            <p><strong>Date:</strong> {new Date(pickup.scheduledDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {pickup.status}</p>
           </li>))
        }
      </ul>
    </div>
  );
};

export default MyPickups;
