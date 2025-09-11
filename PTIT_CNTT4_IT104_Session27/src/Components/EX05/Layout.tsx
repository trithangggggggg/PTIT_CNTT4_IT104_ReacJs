import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-[100vh]">
      <aside className="w-[200px] bg-gray-200 p-[20px]">
        <h2>My Blog</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/blog/posts">Posts</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-[20px]">
        <Outlet />
      </main>
    </div>
  );
}
