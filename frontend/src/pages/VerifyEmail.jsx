import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await api.get(`/auth/verifyemail/${token}`);
        setStatus('success');
        setMessage(res.data.message);
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed. The token may be invalid or expired.');
      }
    };
    verifyToken();
  }, [token]);

  return (
    <div className="center-content">
      <div className="auth-container glass-panel" style={{ textAlign: 'center' }}>
        <h2>Email Verification</h2>
        
        {status === 'verifying' && <p>Verifying your email address...</p>}
        
        {status === 'success' && (
          <>
            <div className="alert alert-success">{message}</div>
            <Link to="/login" className="btn" style={{ marginTop: '1rem' }}>Proceed to Login</Link>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="alert alert-error">{message}</div>
            <Link to="/register" className="btn btn-secondary" style={{ marginTop: '1rem' }}>Back to Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
