import { createBrowserRouter } from "react-router-dom";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import DashboardLayout from "../../Layout/DashboardLayout";
import PrivateRoutes from "../../Routes/PrivateRoutes/PrivateRoutes";
import AddHouseSell from "../../Pages/Dashboard/HouseOwner/AddHouseSell";
import MyHouses from "../../Pages/Dashboard/HouseOwner/MyHouses";
import MyHouseEdit from "../../Pages/Dashboard/HouseOwner/MyHouseEdit";
import HouseOwnerRoutes from "../RoleRoutes/HouseOwnerRoutes";

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
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/add-house",
        element: (
          <HouseOwnerRoutes>
            <AddHouseSell></AddHouseSell>
          </HouseOwnerRoutes>
        ),
      },
      {
        path: "/dashboard/my-houses",
        element: (
          <HouseOwnerRoutes>
            <MyHouses></MyHouses>
          </HouseOwnerRoutes>
        ),
      },
      {
        path: "/dashboard/edit-house/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/my-houses/${params.id}`).then((res) =>
            res.json()
          ),
        element: (
          <HouseOwnerRoutes>
            <MyHouseEdit></MyHouseEdit>
          </HouseOwnerRoutes>
        ),
      },
    ],
  },
]);
export default router;
