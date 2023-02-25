import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/states/user.state";
import { PublicRoutes } from "../models";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import LogoutIcon from "@mui/icons-material/Logout";
import { Navbar } from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins, sans-serif';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
        }
      `,
    },
  },
});

function LoggedUserLayout({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar></Navbar>
      <main className="logged_user_layout_container">
        <Container sx={{ py: 3 }} maxWidth="md">
          {children}
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default LoggedUserLayout;
