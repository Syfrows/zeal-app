import React, { PropsWithChildren } from "react";
import NavBar from "./navBar";
import Footer from "./footer";

const Layout = ({
  children,
  flush = false,
}: PropsWithChildren<{ flush?: boolean }>) => {
  return (
    <div className="mx-auto min-h-screen bg-white">
      <a href="#main-content" className="zeal-skip">
        Skip to content
      </a>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div
        id="main-content"
        tabIndex={-1}
        className={flush ? "grow" : "mx-auto max-w-screen-2xl grow p-4"}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
