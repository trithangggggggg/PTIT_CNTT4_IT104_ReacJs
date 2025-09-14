import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  const baseClass =
    "mr-4 px-2 py-1 rounded transition-colors duration-200";
  const activeClass = "text-red-500 font-bold";
  const inactiveClass = "text-gray-700 hover:text-blue-500";

  return (
    <div>
      {/* Header */}
      <header className="p-4 border-b border-gray-300 bg-gray-100">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/product"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Product
        </NavLink>
        <NavLink
          to="/detail"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Detail
        </NavLink>
      </header>

      {/* Nội dung */}
      <main className="p-6">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
