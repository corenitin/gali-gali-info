import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router';

function BusinessLayout() {
  return (
    <div className=''>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default BusinessLayout;