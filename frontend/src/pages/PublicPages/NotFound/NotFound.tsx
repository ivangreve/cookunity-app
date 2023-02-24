import React from "react";
import AuthLayout from "../../../layouts/AuthLayout";

function NotFound() {
  return (
    <AuthLayout>
      <div className="text-white text-lg">This route doesn't exist! 😔</div>
    </AuthLayout>
  );
}

export default NotFound;
