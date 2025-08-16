// src/routes/RequireRole.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { getRole, isAuthenticated } from '../services/auth';

// roles example: ['ROLE_ADMIN'] or ['ROLE_THEATRE_OWNER', 'ROLE_ADMIN']
export default function RequireRole({ roles }) {
  const authed = isAuthenticated();
  const role = getRole();

  if (!authed) return <Navigate to="/signin" replace />;
  if (!role || !roles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
