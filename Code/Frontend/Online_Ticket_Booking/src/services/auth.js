// src/utils/auth.js
export const getToken = () => localStorage.getItem('token') || null;

export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Try to read role from token or from persisted user profile
export function getRole() {
  const token = getToken();
  const fromToken =
    token && parseJwt(token) && (parseJwt(token).role || parseJwt(token).roles || parseJwt(token).authorities);
  if (Array.isArray(fromToken)) {
    return fromToken[0];
  }
  if (typeof fromToken === 'string') return fromToken;

  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role || null;
  } catch {
    return null;
  }
}

export const isAuthenticated = () => !!getToken();
