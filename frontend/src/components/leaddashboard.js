import React, { useEffect, useState } from 'react';
import API from '../services/api';

const LeadDashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    API.get('/leads')
      .then(res => setLeads(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lead Dashboard</h2>
      <ul>
        {leads.map(lead => (
          <li key={lead._id}>{lead.name} - {lead.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeadDashboard;
