import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddHouseSell = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const navigation = useNavigate();

  const { currentUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imgbbHostKey = `218ccec0a78d63b33e00278172e1c053`;
  const bangladeshPhoneNumberRegex = /^(01[3-9][0-9]{8})$/;

  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const addHouse = {
            name: data.name,
            email: currentUser,
            image: imgData.data.url,
            postingDate: `${date}.${month}.${year}`,
            address: data.address,
            city: data.city,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            roomSize: data.roomSize,
            availabilityDate: data.availabilityDate,
            rentPerMonth: data.rentPerMonth,
            description: data.description,
            phn: data.phn,
          };

          fetch("http://localhost:5000/addHouse", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addHouse),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("House Uploaded Successfully");
                navigation("/dashboard/my-houses");
              }
            });
        }
      });
  };
  return (
    <div>
      <div className="my-2 flex justify-center items-center">
        <div className="card shadow-2xl p-8">
          <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-control w-full max-w-xs">
                <input
                  {...register("name", {
                    required: "Please provided product your name",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <span className="text-error">{errors.name.message}</span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("email")}
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={currentUser}
                  readOnly
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("address", {
                    required: "Please provided address",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="your address"
                />
                {errors.address && (
                  <span className="text-error">{errors.address.message}</span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("city", {
                    required: "Please provided city",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="your city"
                />
                {errors.city && (
                  <span className="text-error">{errors.city.message}</span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("bedrooms", {
                    required: "Please provided bedrooms",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="bedrooms"
                />
                {errors.bedrooms && (
                  <span className="text-error">{errors.bedrooms.message}</span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("bathrooms", {
                    required: "Please provided bathrooms",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="bathrooms"
                />
                {errors.bathrooms && (
                  <span className="text-error">{errors.bathrooms.message}</span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("roomSize", {
                    required: "Please provided room size",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="room size"
                />
                {errors.roomSize && (
                  <span className="text-error">{errors.roomSize.message}</span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("availabilityDate", {
                    required: "Please provided availability date",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="availability date: date/month/year"
                />
                {errors.availabilityDate && (
                  <span className="text-error">
                    {errors.availabilityDate.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("rentPerMonth", {
                    required: "Please provided rent per month",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="rent per month"
                />
                {errors.rentPerMonth && (
                  <span className="text-error">
                    {errors.rentPerMonth.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("phn", {
                    required: "Please provide phone number",
                    pattern: {
                      value: bangladeshPhoneNumberRegex,
                      message:
                        "Please enter a valid Bangladesh phone number (11 digits starting with 01)",
                    },
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Please enter a valid Bangladesh phone number (11 digits starting with 01)"
                />
                {errors.phn && (
                  <span className="text-error">{errors.phn.message}</span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("description", {
                    required: "Please provided description",
                  })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="description"
                />
                {errors.description && (
                  <span className="text-error">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <input
                  {...register("image", {
                    required: "Image is required",
                  })}
                  type="file"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Upload a Image"
                />
                {errors.img && (
                  <span className="text-error">{errors.img.message}</span>
                )}
              </div>
            </div>

            <input
              className="btn btn-accent w-full text-white mt-6 text-center"
              type="submit"
              value="Add House"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHouseSell;
