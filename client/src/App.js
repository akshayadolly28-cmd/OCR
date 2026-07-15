import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { setAuthToken } from './services/api';
import { ProtectedRoute, RoleProtectedRoute, InitializeAuth, Loader } from './utils/helpers';

// Layouts
import NavbarComponent from './layouts/Navbar';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import ComplaintFormPage from './pages/ComplaintFormPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  const { loading, token } = useAuth();

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  if (loading) return <Loader />;

  return (
    <>
      <NavbarComponent />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User Routes */}
          <Route
            path="/user/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['USER']}>
                <UserDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/complaint/new"
            element={
              <RoleProtectedRoute allowedRoles={['USER']}>
                <ComplaintFormPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/complaint/:id"
            element={
              <ProtectedRoute>
                <ComplaintDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Agent Routes */}
          <Route
            path="/agent/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['AGENT']}>
                <AgentDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <InitializeAuth>
          <AppContent />
        </InitializeAuth>
      </AuthProvider>
    </Router>
  );
}

export default App;
