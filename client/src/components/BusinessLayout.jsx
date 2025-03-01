import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function BusinessLayout() {
  return (
    <div className="flex">
      <div className="bg-base-light dark:bg-base-dark z-10">
        <Sidebar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default BusinessLayout;
