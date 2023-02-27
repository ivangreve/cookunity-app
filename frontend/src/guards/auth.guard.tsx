import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";
import { getLocalStorage } from "../utilities";

export const AuthGuard = () => {
  const token = getLocalStorage("token");

  // Check token
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate replace to={PublicRoutes.SIGN_IN}></Navigate>;
  }
};

export default AuthGuard;
