import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import Chatbot from "./chatbot";

const LayOut = () => {
  return (
    <div
      className={`relative min-h-screen pb-96 lg:pb-64"
       bg-gray-200`}
    >
      <NavBar />
      <Outlet />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default LayOut;
