import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Layout from "./Layout";

export default function Main02() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // layout gốc
    children: [
      {
        path: "productlist",
        element: <ProductList />,
      },
      {
        path: "productlist/:id",
        element: <ProductDetail />,
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
