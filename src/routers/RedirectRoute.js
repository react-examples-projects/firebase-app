import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function RedirectRoute() {
  const { user } = useUser();

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
