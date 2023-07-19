/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BookHouseCard = ({ myHouse, deleteHouse }) => {
  const {
    _id,
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
  } = myHouse;
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
        <div className="card-actions justify-between">
          <button className="btn btn-error">
            <Link onClick={() => deleteHouse(_id)} className="text-white">
              Delete
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookHouseCard;
