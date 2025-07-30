import React, { useState } from 'react';
import axios from '../api/axios';
import '../style/Home.css'; // Optional if you want to add custom styling

const AddDevice = () => {
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    image: '',
    price: '',
    conditionPricing: {
      Excellent: '',
      Good: '',
      Fair: '',
      Poor: ''
    },
    forSale: true,
    availableForBuy: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in formData.conditionPricing) {
      setFormData(prev => ({
        ...prev,
        conditionPricing: {
          ...prev.conditionPricing,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        conditionPricing: {
          Excellent: Number(formData.conditionPricing.Excellent),
          Good: Number(formData.conditionPricing.Good),
          Fair: Number(formData.conditionPricing.Fair),
          Poor: Number(formData.conditionPricing.Poor)
        },
        price: Number(formData.price)
      };

      const response = await axios.post(`/devices`, payload);
      alert('Device added successfully!');
      setFormData({
        category: '',
        brand: '',
        model: '',
        image: '',
        price: '',
        conditionPricing: {
          Excellent: '',
          Good: '',
          Fair: '',
          Poor: ''
        },
        forSale: true,
        availableForBuy: false
      });
    } catch (error) {
      alert('Failed to add device.');
      console.error(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add New Device</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Brand</label>
            <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Model</label>
            <input type="text" className="form-control" name="model" value={formData.model} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input type="url" className="form-control" name="image" value={formData.image} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (Base)</label>
            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <h5 className="mt-4">Condition-Based Pricing</h5>
          <div className="row">
            {['Excellent', 'Good', 'Fair', 'Poor'].map((condition) => (
              <div className="col-md-6 mb-3" key={condition}>
                <label className="form-label">{condition}</label>
                <input
                  type="number"
                  className="form-control"
                  name={condition}
                  value={(formData.conditionPricing as any)[condition]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" name="forSale" checked={formData.forSale} onChange={handleCheckbox} />
            <label className="form-check-label">For Sale</label>
          </div>

          <div className="form-check form-switch mb-4">
            <input className="form-check-input" type="checkbox" name="availableForBuy" checked={formData.availableForBuy} onChange={handleCheckbox} />
            <label className="form-check-label">Available For Buy</label>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Add Device</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDevice;