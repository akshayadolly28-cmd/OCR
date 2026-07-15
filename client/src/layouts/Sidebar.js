import React from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ show, onHide }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="start" className="w-75">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link onClick={() => handleNavigate('/')} className="mb-2">
            🏠 Home
          </Nav.Link>
          {user?.role === 'USER' && (
            <>
              <Nav.Link onClick={() => handleNavigate('/user/dashboard')} className="mb-2">
                📊 Dashboard
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/complaint/new')} className="mb-2">
                ➕ New Complaint
              </Nav.Link>
            </>
          )}
          {user?.role === 'AGENT' && (
            <>
              <Nav.Link onClick={() => handleNavigate('/agent/dashboard')} className="mb-2">
                👷 Agent Dashboard
              </Nav.Link>
            </>
          )}
          {user?.role === 'ADMIN' && (
            <>
              <Nav.Link onClick={() => handleNavigate('/admin/dashboard')} className="mb-2">
                ⚙️ Admin Dashboard
              </Nav.Link>
            </>
          )}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
