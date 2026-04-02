import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="center-content">
      <div className="hero-section glass-panel">
        <h1>Secure. Fast. Complete.</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          AuthHub provides enterprise-grade authentication with an elegant, modern UI.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
