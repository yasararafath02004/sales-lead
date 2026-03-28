import React, { useEffect, useState } from 'react';
import API from '../services/api';

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'Website',
    industry: '',
    leadScore: 0,
    status: 'New'
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await API.get('/leads');
        setLeads(res.data);
      } catch (err) {
        alert('Error fetching leads');
      }
    };
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addLead = async () => {
    try {
      await API.post('/leads', formData);
      alert('Lead added!');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        source: 'Website',
        industry: '',
        leadScore: 0,
        status: 'New'
      });
      const res = await API.get('/leads');
      setLeads(res.data);
    } catch (err) {
      alert('Error adding lead');
    }
  };

  const importCSV = async () => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    const res = await API.post('/leads/import/csv', formDataUpload, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert(`CSV imported! Imported: ${res.data.imported}, Skipped (duplicates): ${res.data.skipped}`);
    const leadsRes = await API.get('/leads');
    setLeads(leadsRes.data);
  };

  const importExcel = async () => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    const res = await API.post('/leads/import/excel', formDataUpload, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert(`Excel imported! Imported: ${res.data.imported}, Skipped (duplicates): ${res.data.skipped}`);
    const leadsRes = await API.get('/leads');
    setLeads(leadsRes.data);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lead Capture Form</h2>

      {/* Lead Capture Form */}
      <div className="card p-3 mb-4">
        <div className="row mb-2">
          <div className="col-md-6">
            <input className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          </div>
          <div className="col-md-6">
            <input className="form-control" name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6">
            <input className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          </div>
          <div className="col-md-6">
            <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6">
            <select className="form-select" name="source" value={formData.source} onChange={handleChange}>
              <option>Website</option>
              <option>Referral</option>
              <option>Cold Call</option>
              <option>Email Campaign</option>
              <option>Social Media</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-6">
            <input className="form-control" name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6">
            <input className="form-control" type="number" name="leadScore" value={formData.leadScore} onChange={handleChange} placeholder="Lead Score" />
          </div>
          <div className="col-md-6">
            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Proposal</option>
              <option>Negotiation</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary w-100" onClick={addLead}>Add Lead</button>
      </div>

      {/* Bulk Import Section */}
      <h3>Bulk Import Leads</h3>
      <div className="mb-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn btn-success ms-2" onClick={importCSV}>Import CSV</button>
        <button className="btn btn-info ms-2" onClick={importExcel}>Import Excel</button>
      </div>

      {/* Leads Table */}
      <h3 className="mt-4">Leads List</h3>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Industry</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.source}</td>
              <td>{lead.industry}</td>
              <td>{lead.leadScore}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsPage;
