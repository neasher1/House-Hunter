import { useContext } from "react";
import img from "../../../src/assets/images/dashboard-house.jpg";
import UserContext from "../../contexts/UserContext";
import useHouseRenter from "../../Hooks/useHouseRenter";
import useHouseOwner from "../../Hooks/useHouseOwner";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const [isBuyer] = useHouseRenter(currentUser);
  const [isSeller] = useHouseOwner(currentUser);
  return (
    <div className="mx-auto">
      <h2 className="text-4xl font-bold text-primary text-center my-4">
        {isBuyer && <>Welcome to House Renter Dashboard</>}
        {isSeller && <>Welcome to House Owner Dashboard</>}
      </h2>
      <figure>
        <img className="lg:w-2/4 mx-auto" src={img} alt="dashboard" />
      </figure>
    </div>
  );
};

export default Dashboard;
