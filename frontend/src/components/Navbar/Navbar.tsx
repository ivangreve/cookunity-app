import React from "react";
import Logo from "../Logo/Logo";

const Navbar = ({ children }) => {
  return (
    <>
      <nav className="px-6 sm:px-4 py-6 rounded bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <Logo></Logo>
          </a>
          <div
            className="hidden w-full md:block md:w-auto "
            id="navbar-default"
          ></div>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
