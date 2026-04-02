import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    setLoading(true);

    try {
      const res = await api.post('/auth/forgotpassword', { email });
      setMsg({ type: 'success', text: res.data.message || 'Email sent successfully' });
      setEmail('');
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to send email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-content">
      <div className="auth-container glass-panel">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a reset link</p>
        
        {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <p>Remember your password? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
