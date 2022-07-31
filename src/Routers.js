import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RedirectRoute from "./routers/RedirectRoute";
import PrivateRoute from "./routers/PrivateRoute";
export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />} path="/">
          <Route element={<App />} index />
        </Route>

        <Route element={<RedirectRoute />} path="login">
          <Route element={<Login />} index />
        </Route>

        <Route element={<RedirectRoute />} path="signup">
          <Route element={<Signup />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
