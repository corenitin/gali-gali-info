import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router';

function BusinessLayout() {
  return (
    <div className='flex'>
        <Sidebar />
        <div className='ml-52'>
        <Outlet />
        </div>
    </div>
  )
}

export default BusinessLayout;