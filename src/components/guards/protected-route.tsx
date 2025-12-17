import type { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentUserId = useSelector(
    (state: RootState) => state.auth.currentUserId
  );

  if (!currentUserId) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
