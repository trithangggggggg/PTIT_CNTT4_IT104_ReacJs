import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1  className="bg-blue-600 text-white text-center font-bold h-[50px]" > Trang sản phẩm</h1>
      <Outlet />
    </div>
  );
}
