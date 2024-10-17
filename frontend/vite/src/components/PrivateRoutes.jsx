import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('logginRole'); // Getting user role from localStorage
  
  // Check if user is authenticated and their role is allowed
  return token && allowedRoles.includes(role) ? children : <Navigate to="/login" />
};

export default PrivateRoutes;