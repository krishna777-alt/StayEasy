import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../client/componets/Loading";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
