import React, { PropsWithChildren } from "react";
import NavBar from "./navBar";
import Footer from "./footer";

const Layout = (Props: PropsWithChildren) => {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="mx-auto max-w-screen-2xl grow p-4">{Props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
