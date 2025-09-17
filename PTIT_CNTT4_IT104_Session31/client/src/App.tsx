
import { RouterProvider } from "react-router-dom";
import { routers } from "./routers/router";
import "bootstrap/dist/css/bootstrap.min.css";




export default function App() {
  return (
    <div>
      <RouterProvider router={routers}></RouterProvider>
    </div>
  );
}
