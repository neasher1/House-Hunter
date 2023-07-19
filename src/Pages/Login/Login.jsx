import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { setUserAndLoading } = useContext(UserContext);

  const handleLogin = (data) => {
    const email = data.email;
    // const password = data.password;

    const user = {
      email: data.email,
      password: data.password,
    };

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          fetch(`http://localhost:5000/jwt?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                navigate("/");
                toast.success("user login");
                setUserAndLoading(email);
              }
            });
        } else {
          toast.error(data.error);
        }
      });
  };

  return (
    <div className="h-[500px] flex justify-center items-center my-16">
      <div className="w-96 card shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-accent mb-4 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "email address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-error">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-error">{errors.password?.message}</p>
            )}
            <label className="label">
              <span className="label-text-alt">Forget Password?</span>
            </label>
          </div>
          <input
            className="btn btn-accent w-full text-white my-2"
            type="submit"
            value="Login"
          />
        </form>
        <span className="text-sm my-2 text-center">
          New to House Hunter?{" "}
          <Link to="/register" className="text-primary">
            Create new account
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Login;
