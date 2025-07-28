import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

interface Quote {
  _id: string;
  brand: string;
  model: string;
}

const PickupForm: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState('');
  const [address, setAddress] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/quotes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuotes(res.data);
      } catch (err: any) {
        setError('Failed to load quotes');
      }
    };

    fetchQuotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/pickups', {
        quoteId: selectedQuoteId,
        address,
        scheduledDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Pickup scheduled successfully!');
      setSelectedQuoteId('');
      setAddress('');
      setScheduledDate('');
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Pickup scheduling failed');
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Schedule Pickup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Select Quote:</label><br />
        <select value={selectedQuoteId} onChange={(e) => setSelectedQuoteId(e.target.value)} required>
          <option value="">Select a quote</option>
          {quotes.map((q) => (
            <option key={q._id} value={q._id}>
              {q.brand} - {q.model}
            </option>
          ))}
        </select><br /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        /><br /><br />

        <input
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Schedule Pickup</button>
      </form>
    </div>
  );
};

export default PickupForm;