import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { useContext } from "react";

const BookingModal = ({ bookHouses, setBookHouses }) => {
  const { currentUser } = useContext(UserContext);
  const {
    name,
    email,
    image,
    postingDate,
    address,
    city,
    bedrooms,
    bathrooms,
    phn,
    description,
    roomSize,
    availabilityDate,
    rentPerMonth,
  } = bookHouses;
  const navigate = useNavigate();
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = currentUser;

    const booking = {
      email,
      name,
      image,
      postingDate,
      address,
      city,
      bedrooms,
      bathrooms,
      phn,
      description,
      roomSize,
      availabilityDate,
      rentPerMonth,
    };

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setBookHouses(null);
          toast.success("Booking Confirmed");
          navigate("/dashboard/my-book-houses");
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-xl font-bold text-primary">Book Now</h3>

          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 my-4"
          >
            <input
              type="email"
              name="email"
              defaultValue={currentUser}
              readOnly
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="itemName"
              defaultValue={name}
              readOnly
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="address"
              placeholder="Your address"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="your phn"
              placeholder="Your Phn Number:"
              className="input input-bordered w-full"
            />

            <input
              type="submit"
              className="btn btn-accent text-white"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
