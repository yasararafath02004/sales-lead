import React, { useState } from 'react';
import API from '../services/api';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: '',
    industry: '',
    status: 'New'
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    API.post('/leads', formData)
      .then(res => {
        alert('Lead added successfully!');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          source: '',
          industry: '',
          status: 'New'
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add New Lead</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="source" placeholder="Source" value={formData.source} onChange={handleChange} />
        <input name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Proposal</option>
          <option>Negotiation</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
        <button type="submit">Add Lead</button>
      </form>
    </div>
  );
};

export default LeadForm;
