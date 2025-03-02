import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function BusinessLayout() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full lg:ml-[12.65rem]">
        <Outlet />
      </div>
    </div>
  );
}

export default BusinessLayout;
