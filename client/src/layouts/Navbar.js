import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function NavbarComponent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} className="fw-bold" style={{ cursor: 'pointer' }}>
          📋 OCR System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                {user.role === 'USER' && (
                  <>
                    <Nav.Link onClick={() => navigate('/user/dashboard')} style={{ cursor: 'pointer' }} className="me-2">Dashboard</Nav.Link>
                    <Nav.Link onClick={() => navigate('/complaint/new')} style={{ cursor: 'pointer' }} className="me-3">File Complaint</Nav.Link>
                  </>
                )}
                {user.role === 'AGENT' && (
                  <Nav.Link onClick={() => navigate('/agent/dashboard')} style={{ cursor: 'pointer' }} className="me-3">Agent Dashboard</Nav.Link>
                )}
                {user.role === 'ADMIN' && (
                  <Nav.Link onClick={() => navigate('/admin/dashboard')} style={{ cursor: 'pointer' }} className="me-3">Admin Dashboard</Nav.Link>
                )}
                <Navbar.Text className="text-light me-3">Welcome, {user.name}!</Navbar.Text>
                <Button variant="light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate('/login')} className="me-2" style={{ cursor: 'pointer' }}>
                  Login
                </Nav.Link>
                <Nav.Link onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
