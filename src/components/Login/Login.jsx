import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { toast } from "react-hot-toast";

const Login = () => {
  const [show, setShow] = useState(false);
  const { loginWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/";
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginWithEmail(email, password)
      .then((result) => {
        const loggedUser = result.user;
        toast.success("Login Successful");
        form.reset();
        console.log(loggedUser);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="relative border-b-4 border-l-4 shadow-md lg:my-28 md:my-16 my-11 drop-shadow bg-orange-300 border-orange-300 rounded-lg md:mx-auto mx-4 md:w-3/4 lg:w-1/3">
      <div className="card-body  mt-10 border-2  bg-white border-gray-200 rounded-lg mx-auto ">
        <h2 className="text-center text-4xl">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="text-base">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              name="email"
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="text-base">Password</span>
            </label>
            <input
              type={show ? "text" : "password"}
              placeholder="password"
              name="password"
              required
              className="input input-bordered"
            />
            <p onClick={() => setShow(!show)}>
              <small>
                {show ? <span>Hide Password</span> : <span>Show Password</span>}
              </small>
            </p>
            <label className="label">
              <Link href="#" className=" link link-hover text-primary">
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-5">
            <input
              type="submit"
              value="Login"
              className="btn bg-secondary capitalize text-xl border-none hover:bg-orange-300 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="label flex justify-center">
              New to Ema-john?
              <Link to="/signup" className=" link link-hover text-primary">
                Create New Account
              </Link>
            </label>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="border-b h-1 w-full border-gray-300"></div>
            <span>or</span>
            <div className="border-b h-1 w-full border-gray-300"></div>
          </div>
          <div className="form-control  mt-4">
            <button className="btn bg-white text-base flex justify-center items-center border-gray-300 gap-2 hover:bg-secondary hover:border-orange-300 text-black">
              <img
                className="w-7 h-7"
                src="https://i.postimg.cc/4NhHcV5v/google.png"
                alt=""
              />
              <span className="capitalize ">Continue With Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
