import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCardClick = (targetRole, targetPath) => {
    if (!user) {
      toast.info(`Please log in as an ${targetRole.toLowerCase()} to access this dashboard.`);
      navigate('/login');
      return;
    }

    if (user.role === targetRole) {
      navigate(targetPath);
    } else {
      toast.warning(`Access Denied: You are logged in as a ${user.role}, not an ${targetRole}.`);
    }
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 mb-4">📋 Online Complaint Registration & Management System</h1>
        <p className="lead mb-4">Efficiently manage complaints and feedback in your organization</p>
        {!user ? (
          <div>
            <Button variant="primary" size="lg" className="me-3" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="outline-primary" size="lg" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        ) : (
          <p className="text-muted">Welcome back, {user.name}! Explore your dashboard.</p>
        )}
      </div>

      <Row className="g-4 mt-5">
        <Col md={6} lg={4}>
          <Card className="text-center shadow-sm h-100 interactive-card" onClick={() => handleCardClick('USER', '/user/dashboard')}>
            <Card.Body>
              <h5 className="card-title">👤 Users</h5>
              <p>Submit and track complaints with ease</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="text-center shadow-sm h-100 interactive-card" onClick={() => handleCardClick('AGENT', '/agent/dashboard')}>
            <Card.Body>
              <h5 className="card-title">👷 Agents</h5>
              <p>Resolve complaints and communicate with users</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="text-center shadow-sm h-100 interactive-card" onClick={() => handleCardClick('ADMIN', '/admin/dashboard')}>
            <Card.Body>
              <h5 className="card-title">⚙️ Admin</h5>
              <p>Manage the system and view analytics</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
