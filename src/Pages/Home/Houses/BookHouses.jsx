import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import BookHouseCard from "./BookHouseCard";

const BookHouses = () => {
  const { currentUser } = useContext(UserContext);
  const { data: myHouses = [], refetch } = useQuery({
    queryKey: ["myHouses"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/my-book-houses?email=${currentUser}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const deleteHouse = (id) => {
    fetch(`http://localhost:5000/my-book-houses/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch();
          toast.success("Deleted house Successfully");
        }
      });
  };
  return (
    <div className="my-4 mx-6">
      <h2 className="text-3xl font-bold text-primary">My Houses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1440px] mx-auto">
        {myHouses?.map((myHouse) => (
          <BookHouseCard
            key={myHouse._id}
            myHouse={myHouse}
            deleteHouse={deleteHouse}
          ></BookHouseCard>
        ))}
      </div>
    </div>
  );
};

export default BookHouses;
