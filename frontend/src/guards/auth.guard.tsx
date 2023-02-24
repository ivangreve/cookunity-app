import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";
import { LocalStorageManager } from "../utilities";

export const AuthGuard = () => {
  const localStoreManager = new LocalStorageManager();
  const token = localStoreManager.getToken();

  // Check token
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate replace to={PublicRoutes.SIGN_IN}></Navigate>;
  }
};

export default AuthGuard;
