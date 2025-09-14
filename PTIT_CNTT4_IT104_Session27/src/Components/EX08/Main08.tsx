import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function Main() {
  const routers = createBrowserRouter([
    { 
      path: "/", 
      element: <Login></Login> 
    },
    { 
      path: "/register", 
      element: <Register></Register> 
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}
