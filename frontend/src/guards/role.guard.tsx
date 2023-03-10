import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";
import { Roles } from "../models/roles";
import { getRole } from "../utilities";

interface Props {
  role: string;
}

export const RoleGuard = ({ role }: Props) => {
  const userRole = getRole();

  if (userRole === role) {
    return <Outlet />;
  } else {
    return <Navigate replace to={PublicRoutes.SIGN_IN}></Navigate>;
  }
};

export default RoleGuard;
