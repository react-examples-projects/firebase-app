import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import LoaderPage from "../components/LoaderPage";

export default function RedirectRoute() {
  const { user, isLoading } = useUser();
  
  if (isLoading) return <LoaderPage />;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
