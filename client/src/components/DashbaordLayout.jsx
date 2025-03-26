import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import { Outlet } from "react-router";

function DashbaordLayout() {
  return (
        <Outlet />
  )
}

export default DashbaordLayout