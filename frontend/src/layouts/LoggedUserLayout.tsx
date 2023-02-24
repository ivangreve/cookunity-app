import React from "react";
import Logo from "../components/Logo/Logo";
import { Navbar } from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

function LoggedUserLayout({ children }: Props) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 bg-cover min-h-screen">
      <Navbar>
        <div className="text-white lg:pr-32 lg:pl-32">{children}</div>
      </Navbar>
    </section>
  );
}

export default LoggedUserLayout;
