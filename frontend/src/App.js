import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Reports from './components/reports';
import LoginPage from './pages/loginpage';
import LeadPage from './pages/leadpage';
import UserDashboard from './pages/userdashboard';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  const role = localStorage.getItem('role');

  return (
    <Router>
      <div>
        <h1>Sales Lead CRM</h1>
        <nav>
          <Link to="/">Login</Link> |{" "}
          <Link to="/leads">Leads</Link> |{" "}
          <Link to="/dashboard">Dashboard</Link> |{" "}
          {role === 'Admin' && <Link to="/reports">Reports</Link>}
        </nav>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/leads" element={<PrivateRoute><LeadPage /></PrivateRoute>} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

