import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h1>Ứng dụng Quản lý Công việc</h1>
        <nav>
          <Link to="/">Trang chủ</Link>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
