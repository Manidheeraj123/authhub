import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Settings = () => {
  const { user, login } = useContext(AuthContext);
  
  // Details state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [detailsMsg, setDetailsMsg] = useState({ type: '', text: '' });
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState({ type: '', text: '' });
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setDetailsMsg({ type: '', text: '' });
    setDetailsLoading(true);
    
    try {
      const res = await api.put('/auth/updatedetails', { name, email });
      login(res.data.user);
      setDetailsMsg({ type: 'success', text: 'Details updated successfully' });
    } catch (err) {
      setDetailsMsg({ type: 'error', text: err.response?.data?.message || 'Failed to update details' });
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPwdMsg({ type: '', text: '' });
    setPwdLoading(true);
    
    try {
      const res = await api.put('/auth/updatepassword', { currentPassword, newPassword });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      setPwdMsg({ type: 'success', text: 'Password updated successfully' });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPwdMsg({ type: 'error', text: err.response?.data?.message || 'Failed to update password' });
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="glass-panel" style={{ maxWidth: '600px' }}>
        <h2>Update Details</h2>
        <p>Modify your account information</p>
        
        {detailsMsg.text && (
          <div className={`alert alert-${detailsMsg.type}`}>{detailsMsg.text}</div>
        )}
        
        <form onSubmit={handleUpdateDetails}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn" disabled={detailsLoading}>
            {detailsLoading ? 'Updating...' : 'Save Details'}
          </button>
        </form>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px' }}>
        <h2>Update Password</h2>
        <p>Ensure your account stays secure</p>
        
        {pwdMsg.text && (
          <div className={`alert alert-${pwdMsg.type}`}>{pwdMsg.text}</div>
        )}
        
        <form onSubmit={handleUpdatePassword}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn" disabled={pwdLoading}>
            {pwdLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default Settings;
