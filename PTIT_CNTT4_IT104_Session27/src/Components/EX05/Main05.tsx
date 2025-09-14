import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./Post";
import PostDetail from "./PostDetail";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/blog",
    element: <Layout></Layout>,
    children: [
      { 
        path: "posts", 
        element: <Posts ></Posts> 
    },
      { 
        path: "posts/:id", 
        element: <PostDetail ></PostDetail>

      },
    ],
  },
]);

export default function Main05() {
  return <RouterProvider router={router} ></RouterProvider>;
}