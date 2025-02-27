import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import { Outlet } from "react-router";

function DashbaordLayout() {
  return (
    <div>
        <DashboardNavbar />
        <Outlet />
    </div>
  )
}

export default DashbaordLayout