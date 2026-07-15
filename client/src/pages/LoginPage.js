import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { setAuthToken, loginUser } from '../services/api';
import { LoadingSpinner } from '../utils/helpers';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const performLogin = async (credentials) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await loginUser(credentials);
      setAuthToken(data.token);
      login(data.user, data.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    performLogin(formData);
  };

  const handleQuickLogin = (email, password) => {
    setFormData({ email, password });
    performLogin({ email, password });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Login'}
            </Button>
          </Form>
          <p className="text-center mb-0">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>

          <div className="mt-4 pt-3 border-top">
            <h6 className="text-center text-muted mb-3">Quick Demo Login</h6>
            <div className="d-flex flex-column gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleQuickLogin('user@example.com', 'User@123')}
                disabled={loading}
              >
                👤 Login as User
              </Button>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => handleQuickLogin('agent@example.com', 'Agent@123')}
                disabled={loading}
              >
                👷 Login as Agent
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleQuickLogin('admin@example.com', 'Admin@123')}
                disabled={loading}
              >
                ⚙️ Login as Admin
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
