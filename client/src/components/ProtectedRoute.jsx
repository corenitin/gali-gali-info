import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to='/auth/login' replace />
}

export default ProtectedRoute;
