import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (password !== confirmPassword) {
      return setMsg({ type: 'error', text: 'Passwords do not match' });
    }

    setLoading(true);
    try {
      await api.put(`/auth/resetpassword/${token}`, { password });
      setMsg({ type: 'success', text: 'Password reset successful!' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to reset password. Token may be invalid or expired.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-content">
      <div className="auth-container glass-panel">
        <h2>Set New Password</h2>
        <p>Please enter your new password</p>
        
        {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <p>Back to <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
