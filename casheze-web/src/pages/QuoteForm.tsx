import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const QuoteForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    condition: '',
    issues: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/quotes', {
        ...formData,
        issues: formData.issues.split(',').map((i) => i.trim()),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Quote created successfully!');
      navigate('/'); // or wherever you want to redirect
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create quote');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Get a Quote</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
        /><br />

        <select name="condition" value={formData.condition} onChange={handleChange} required>
          <option value="">Select Condition</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select><br />

        <input
          type="text"
          name="issues"
          placeholder="Issues (comma separated)"
          value={formData.issues}
          onChange={handleChange}
        /><br />

        <button type="submit">Submit Quote</button>
      </form>
    </div>
  );
};

export default QuoteForm;
