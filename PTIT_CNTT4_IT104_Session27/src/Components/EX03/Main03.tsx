import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      { 
        index: true, 
        element: <TaskList></TaskList> 
      },
      { 
        path: "task/:id", 
        element: <TaskDetail></TaskDetail> 
      },
    ],
  },
]);

export default function Main03() {
  return <RouterProvider router={router}></RouterProvider>;
}
