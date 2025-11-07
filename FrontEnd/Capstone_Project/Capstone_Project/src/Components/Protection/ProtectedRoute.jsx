import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    // Se non loggato, manda a /login
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoute;
