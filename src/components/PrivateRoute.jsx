import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;