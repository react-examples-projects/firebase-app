import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function PrivateRoute(props) {
  const { user } = useUser();

  if (user) return <Outlet {...props} />;

  return <Navigate to="/login" replace />;
}
