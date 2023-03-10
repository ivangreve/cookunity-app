import React from "react";
import Logo from "../../../components/Logo/Logo";

function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo></Logo>
      <h1>This route doesn't exist! 😔</h1>
    </div>
  );
}

export default NotFound;
