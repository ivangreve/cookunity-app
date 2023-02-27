import * as React from "react";
import Container from "@mui/material/Container";
import { Navbar } from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

function LoggedUserLayout({ children }: Props) {
  return (
    <>
      <Navbar></Navbar>
      <main className="logged_user_layout_container">
        <Container sx={{ py: 3 }} maxWidth="md">
          {children}
        </Container>
      </main>
    </>
  );
}

export default LoggedUserLayout;
