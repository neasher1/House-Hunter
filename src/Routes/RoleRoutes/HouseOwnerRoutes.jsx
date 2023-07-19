import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import useHouseOwner from "../../Hooks/useHouseOwner";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const HouseOwnerRoutes = ({ children }) => {
  const { currentUser, loading } = useContext(UserContext);

  const [isSeller, sellerLoading] = useHouseOwner(currentUser);
  const location = useLocation();

  if (loading || sellerLoading) {
    return (
      <div className="flex justify-center items-center space-x-2 my-20">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (currentUser && isSeller) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default HouseOwnerRoutes;
