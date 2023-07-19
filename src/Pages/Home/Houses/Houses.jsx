import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner/Spinner";
import House from "./House";
import { useState } from "react";
import BookingModal from "./BookingModal";

const Houses = () => {
  const [bookHouses, setBookHouses] = useState(null);

  const { data: myHouses = [], isLoading } = useQuery({
    queryKey: ["myHouses"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/all-house`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    <Spinner></Spinner>;
  }

  return (
    <div className="my-16">
      <h2 className="text-3xl text-center font-bold">
        Houses:{myHouses.length}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 my-12  max-w-[1440px] mx-auto">
        {myHouses.map((house) => (
          <House
            key={house._id}
            house={house}
            setBookHouses={setBookHouses}
          ></House>
        ))}
      </div>
      {bookHouses && (
        <BookingModal
          bookHouses={bookHouses}
          setBookHouses={setBookHouses}
        ></BookingModal>
      )}
    </div>
  );
};

export default Houses;
