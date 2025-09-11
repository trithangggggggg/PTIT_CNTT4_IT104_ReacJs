import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./Contact";
import About from "./About";
import Home from "./Home";
import Layout from "./Layout";

export default function Main() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path: "/about",
          element: <About></About>,
        },
        {
          path: "/contact",
          element: <Contact></Contact>,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
