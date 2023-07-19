import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Spinner from "../../Pages/Shared/Spinner/Spinner";

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({ children }) => {
  const { currentUser, loading } = useContext(UserContext);
  if (loading) {
    return <Spinner></Spinner>;
  }
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
