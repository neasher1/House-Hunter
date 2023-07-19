import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import UserContext from "../contexts/UserContext";
import useHouseRenter from "../Hooks/useHouseRenter";
import useHouseOwner from "../Hooks/useHouseOwner";

const DashboardLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [isBuyer] = useHouseRenter(currentUser);
  const [isSeller] = useHouseOwner(currentUser);
  // console.log(currentUser);
  // console.log("buyer:", currentUser, isBuyer);
  // console.log("seller", currentUser, isSeller);

  return (
    <div className="mx-auto">
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content px-5 md:px-14 my-16">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div>
              {currentUser && (
                <li>
                  <Link className="btn btn-outline my-4" to="/dashboard">
                    My Dashboard
                  </Link>
                </li>
              )}
              {isBuyer && (
                <>
                  <li>
                    <Link
                      className="btn btn-outline my-4"
                      to="/dashboard/my-book-houses"
                    >
                      booked houses
                    </Link>
                  </li>
                </>
              )}
              {isSeller && (
                <>
                  <li>
                    <Link
                      className="btn btn-outline my-4"
                      to="/dashboard/add-house"
                    >
                      Add House
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-outline my-4"
                      to="/dashboard/my-houses"
                    >
                      My House
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
