import React from "react";
import Logo from "../Logo/Logo";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../store/states/user.state";
import { PublicRoutes } from "../../models";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate(PublicRoutes.ROOT);
  };

  return (
    <AppBar position="relative">
      <Toolbar className="navbar_toolbar">
        <Logo></Logo>

        <span className="navbar_right_item">
          <Avatar alt="Remy Sharp" src={user?.image ? user.image : null} />
          <IconButton
            onClick={handleLogout}
            aria-label="Logout"
            component="label"
          >
            <LogoutIcon className="navbar_icon_button" />
          </IconButton>
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
