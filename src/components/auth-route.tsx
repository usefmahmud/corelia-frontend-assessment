import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.auth.currentUserId
  );

  if (currentUserId) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
