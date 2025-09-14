import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Product from "./Product";
import Detail from "./Detail";

export default function Main06() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "product", element: <Product></Product> },
        { path: "detail", element: <Detail></Detail> },
      ],
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}
