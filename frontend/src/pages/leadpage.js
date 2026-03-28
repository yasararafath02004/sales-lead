import React from 'react';
import LeadDashboard from '../components/LeadDashboard';
import LeadForm from '../components/LeadForm';

const LeadPage = () => {
  return (
    <div>
      <h2>Leads</h2>
      <LeadForm />
      <LeadDashboard />
    </div>
  );
};

export default LeadPage;
