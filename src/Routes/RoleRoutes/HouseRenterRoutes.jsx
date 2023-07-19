import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import useHouseRenter from "../../Hooks/useHouseRenter";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const HouseRenterRoutes = ({ children }) => {
  const { currentUser, loading } = useContext(UserContext);

  const [isBuyer, BuyerLoading] = useHouseRenter(currentUser);
  const location = useLocation();
  if (loading || BuyerLoading) {
    return (
      <div className="flex justify-center items-center space-x-2 my-20">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (currentUser && isBuyer) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default HouseRenterRoutes;
