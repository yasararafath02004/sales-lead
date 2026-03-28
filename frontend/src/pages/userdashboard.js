import React, { useEffect, useState } from 'react';
import API from '../services/api';

const UserDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/leads')
      .then(res => setLeads(res.data))
      .catch(() => setError('Failed to load dashboard data'));
  }, []);

  const upcomingReminders = leads.filter(lead => {
    if (!lead.reminderAt) return false;
    return new Date(lead.reminderAt) <= new Date(Date.now() + 24 * 60 * 60 * 1000);
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card p-3 shadow-sm mb-4">
        <h5 className="mb-3">Upcoming Reminders (Next 24 Hours)</h5>
        {upcomingReminders.length === 0 ? (
          <p className="text-muted">No reminders due soon.</p>
        ) : (
          <ul className="list-group">
            {upcomingReminders.map(lead => (
              <li key={lead._id} className="list-group-item d-flex justify-content-between">
                <span>{lead.name} ({lead.email})</span>
                <span className="badge bg-warning text-dark">
                  {new Date(lead.reminderAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Your Leads</h5>
        <ul className="list-group">
          {leads.map(lead => (
            <li key={lead._id} className="list-group-item d-flex justify-content-between">
              <span>{lead.name} ({lead.email})</span>
              <span className="badge bg-info">{lead.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
