import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

interface Quote {
  _id: string;
  brand: string;
  model: string;
  condition: string;
  issues: string[];
  createdAt: string;
}

const MyQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
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
        setError(err.response?.data?.error || 'Failed to load quotes');
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>My Quotes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {quotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        <ul>
          {quotes.map((quote) => (
            <li key={quote._id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <strong>{quote.brand} - {quote.model}</strong><br />
              Condition: {quote.condition} <br />
              Issues: {quote.issues.join(', ') || 'None'}<br />
              Date: {new Date(quote.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyQuotes;
