import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import LoaderPage from "../components/LoaderPage";

export default function PrivateRoute(props) {
  const { user, isLoading } = useUser();

  if (isLoading) return <LoaderPage />;

  if (user) return <Outlet {...props} />;

  return <Navigate to="/login" replace />;
}
