import React from "react";
import Footer from "./shared/Footer";
import NavBar from "./shared/NavBar";

function Layout({ children }) {
  return (
    <div className="flex  flex-col justify-between min-h-screen">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
