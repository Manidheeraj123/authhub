import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/auth/dashboard');
        setDashboardData(res.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="center-content">Loading dashboard...</div>;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="glass-panel">
        <h2>Dashboard</h2>
        <p>Welcome back, {user?.name}!</p>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <div className="dashboard-stats">
          <div className="stat-card glass-panel">
            <h3>Role</h3>
            <p style={{textTransform: 'capitalize'}}>{user?.role}</p>
          </div>
          <div className="stat-card glass-panel">
            <h3>Status</h3>
            <p style={{ color: 'var(--success-color)' }}>Verified</p>
          </div>
          <div className="stat-card glass-panel">
            <h3>Server</h3>
            <p>{dashboardData?.message || 'Connected'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
