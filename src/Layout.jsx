import React from 'react'
import NormalHeader from './components/Header/NormalHeader'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <NormalHeader />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout