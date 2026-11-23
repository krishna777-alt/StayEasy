import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../client/componets/Loading";
import { getRoleHomePath } from "./roleRoutes";

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth,
  );

  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getRoleHomePath(user?.role)} replace />;
  }

  return children;
}

export default ProtectedRoute;
