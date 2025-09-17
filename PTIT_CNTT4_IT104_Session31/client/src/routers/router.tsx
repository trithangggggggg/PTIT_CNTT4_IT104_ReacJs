import { createBrowserRouter } from "react-router-dom";
// import ListPost from "../pages/ListPost"
import App from "../App";
import ListPost from "../pages/ListPost";

export const routers = createBrowserRouter([
    // {
    //     path:"/",
    //     element:<App></App>
    // },
    {
        path:"/list-post",
        element:<ListPost></ListPost>
    }
])