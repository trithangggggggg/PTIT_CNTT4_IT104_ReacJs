import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <div className="flex justify-center gap-7">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
      <div className="text-center pt-7">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
