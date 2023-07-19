import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { useContext } from "react";

/* eslint-disable react/prop-types */
const House = ({ house, setBookHouses }) => {
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
  } = house;

  const { currentUser } = useContext(UserContext);

  return (
    <div className="card shadow-xl mt-4">
      <figure>
        <img src={image} alt="house!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>House Name: {name}</p>
        <p>House Owner Email: {email}</p>
        <p>Posting Date: {postingDate}</p>
        <p>address: {address}</p>
        <p>city: {city}</p>
        <p>bedrooms: {bedrooms}</p>
        <p>bathrooms: {bathrooms}</p>
        <p>phn: {phn}</p>
        <p>roomSize: {roomSize}</p>
        <p>availabilityDate: {availabilityDate}</p>
        <p>rentPerMonth: {rentPerMonth}</p>
        <p>description: {description}</p>
        {currentUser ? (
          <label
            onClick={() => setBookHouses(house)}
            htmlFor="booking-modal"
            className="btn btn-primary text-white my-2"
          >
            Book Now
          </label>
        ) : (
          <Link to="/login" className="btn btn-primary text-white">
            Login to Book
          </Link>
        )}
      </div>
    </div>
  );
};

export default House;
