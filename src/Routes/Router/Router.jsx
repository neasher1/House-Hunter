import { createBrowserRouter } from "react-router-dom";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);
export default router;
