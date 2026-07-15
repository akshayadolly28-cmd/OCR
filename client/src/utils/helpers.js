import React from 'react';
import { useAuth } from '../context/AuthContext';
import { setAuthToken, getProfile } from '../services/api';
import { Spinner } from 'react-bootstrap';

export function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center py-4">
      <Spinner animation="border" size="sm" />
    </div>
  );
}

export function ProtectedRoute({ children }) {
  const { user, token, loading } = useAuth();

  if (loading) return <Loader />;
  if (!token) window.location.href = '/login';

  return children;
}

export function RoleProtectedRoute({ children, allowedRoles }) {
  const { user, token, loading } = useAuth();

  if (loading) return <Loader />;
  if (!token) {
    window.location.href = '/login';
    return null;
  }
  if (!allowedRoles.includes(user?.role)) {
    window.location.href = '/';
    return null;
  }

  return children;
}

export function InitializeAuth({ children }) {
  const { token, setUser, setLoading, logout } = useAuth();

  React.useEffect(() => {
    async function init() {
      if (token) {
        setAuthToken(token);
        try {
          const { data } = await getProfile();
          setUser(data.user);
        } catch (err) {
          console.error('Failed to restore session:', err);
          logout();
        }
      }
      setLoading(false);
    }
    init();
  }, [token, setUser, setLoading, logout]);

  return children;
}
