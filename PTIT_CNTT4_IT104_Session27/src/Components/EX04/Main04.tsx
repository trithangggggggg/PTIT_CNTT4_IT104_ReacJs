import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import ProductList from "./ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "products",
        element: <ProductList></ProductList>,
      },
    ],
  },
]);

export default function Main04() {
  return <RouterProvider router={router}></RouterProvider>;
}
