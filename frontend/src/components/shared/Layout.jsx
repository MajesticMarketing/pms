import React from "react"
import {Outlet} from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Layout() {

  return (
    <div className="flex flex-column bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar/>
      <div className="flex-1">
        <Header/> 
        <div>{<Outlet/>}</div> 
      </div>
      {/* <div className="bg-teal-200">footer</div> */}
    </div>
  )
}