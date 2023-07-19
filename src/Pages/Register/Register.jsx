import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUserAndLoading } = useContext(UserContext);

  const handleSignUp = (data) => {
    const user = {
      userName: data.name,
      userEmail: data.email,
      userPass: data.password,
      userPhn: data.phnNumber,
      role: data.role,
    };

    const email = data.email;

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          fetch(`http://localhost:5000/jwt?email=${data.email}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                toast.success("user registered");
                navigate("/");
                setUserAndLoading(email);
              }
            });
        } else {
          toast.error(data.error);
        }
      });
  };

  return (
    <div className="h-[500px] flex justify-center items-center my-32">
      <div className="w-96 card shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-accent mb-4 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              {...register("name", {
                required: "Please provided your name",
              })}
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <span className="text-error">{errors.name.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              {...register("phnNumber", {
                required: "Please provided your phone number",
              })}
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.phnNumber && (
              <span className="text-error">{errors.phnNumber.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: "email address is required",
              })}
              type="email"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <span className="text-error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                  message:
                    "Password should be minimum six characters, at least one uppercase, one lowercase and one number",
                },
                minLength: {
                  value: 6,
                  message: "password should be at least 6 characters or long",
                },
              })}
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <span className="text-error">{errors.password.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-xs my-4">
            <div className="input-group">
              <select {...register("role")} className="select select-bordered">
                <option value="House Owner">House Owner</option>
                <option value="House Renter">House Renter</option>
              </select>
            </div>
          </div>

          <input
            className="btn btn-accent w-full text-white my-4"
            type="submit"
            value="Register"
          />
        </form>
        <span className="text-sm my-2 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Please Login
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Register;
