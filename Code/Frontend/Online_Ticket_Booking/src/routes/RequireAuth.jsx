// src/routes/RequireAuth.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

export default function RequireAuth() {
  const location = useLocation();
  return isAuthenticated()
    ? <Outlet />
    : <Navigate to="/signin" replace state={{ from: location }} />;
}
