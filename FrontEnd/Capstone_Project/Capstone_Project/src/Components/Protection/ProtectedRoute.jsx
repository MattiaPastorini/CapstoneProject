import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken"); // <-- Token salvato dopo login
  if (!accessToken) {
    // Se manca il token, mandi al login
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
