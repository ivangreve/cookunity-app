import React from "react";
import Logo from "../components/Logo/Logo";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <section className="dark:bg-gray-900 bg-cover min-h-screen pt-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
        <a
          href="https://www.cookunity.com/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Logo />
        </a>
        {children}
      </div>
    </section>
  );
}

export default AuthLayout;
