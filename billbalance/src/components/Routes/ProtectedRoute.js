import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  <Navigate to='/login' />;
  return <>{children}</>;
}
