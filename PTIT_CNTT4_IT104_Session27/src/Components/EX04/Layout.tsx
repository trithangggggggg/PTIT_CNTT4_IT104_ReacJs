import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div >
      <header style={{ marginBottom: 20 }}>
        <h1>Ứng dụng quản lý sản phẩm</h1>
        <nav>
          <Link to="/products">Danh sách sản phẩm</Link>
        </nav>
      </header>
      <main>
        <Outlet ></Outlet>
      </main>
    </div>
  );
}
