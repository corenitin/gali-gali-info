import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import Loading from './Loading.jsx';

function ProtectedRoute() {
  const { user, loading } = useAuth();
  console.log(user);

  if(loading) return <Loading />

  return user ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute;

