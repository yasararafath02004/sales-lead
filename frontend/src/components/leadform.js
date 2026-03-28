import React, { useState } from 'react';
import API from '../services/api';

const LeadForm = ({ onLeadAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: '',
    status: 'New'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/leads', formData)
      .then(res => {
        onLeadAdded(res.data);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          source: '',
          status: 'New'
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-3">
      <h5>Add New Lead</h5>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control mb-2" required />
      <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="form-control mb-2" />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control mb-2" />
      <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="form-control mb-2" />
      <input type="text" name="source" placeholder="Source" value={formData.source} onChange={handleChange} className="form-control mb-2" />
      <select name="status" value={formData.status} onChange={handleChange} className="form-select mb-2">
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Proposal</option>
        <option>Negotiation</option>
        <option>Won</option>
        <option>Lost</option>
      </select>
      <button type="submit" className="btn btn-primary">Add Lead</button>
    </form>
  );
};

export default LeadForm;
