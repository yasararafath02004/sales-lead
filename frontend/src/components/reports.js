import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Reports = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    API.get('/reports')
      .then(res => setReport(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!report) return <p className="mt-4">Loading reports...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Reports</h2>
      <div className="card p-3 shadow-sm mb-3">
        <h5>Total Leads</h5>
        <p className="fs-4 fw-bold">{report.totalLeads}</p>
      </div>

      <div className="card p-3 shadow-sm mb-3">
        <h5>Leads by Status</h5>
        <ul className="list-group">
          {report.byStatus.map(s => (
            <li key={s._id} className="list-group-item d-flex justify-content-between">
              <span>{s._id}</span>
              <span className="badge bg-primary">{s.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-3 shadow-sm">
        <h5>Leads by Owner</h5>
        <ul className="list-group">
          {report.byOwner.map(o => (
            <li key={o._id} className="list-group-item d-flex justify-content-between">
              <span>{o._id}</span>
              <span className="badge bg-success">{o.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
