import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function BusinessLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-4 lg:ml-56">
        <Outlet />
      </div>
    </div>
  );
}

export default BusinessLayout;
