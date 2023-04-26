import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const { createUserWithEmail } = useContext(AuthContext);
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    console.log(email, password, confirmPassword);

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else if (password !== confirmPassword) {
      toast.error("Your password did not match");
      return;
    }

    createUserWithEmail(email, password)
      .then((result) => {
        const loggedUser = result.user;
        toast.success("Sign Up Successfully");
        form.reset();
        console.log(loggedUser);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="relative border-b-4 border-l-4 shadow-md lg:my-28 md:my-16 my-11 drop-shadow bg-orange-300 border-orange-300 rounded-lg md:mx-auto mx-4 md:w-3/4 lg:w-1/3">
      <div className="card-body  mt-10 border-2  bg-white border-gray-200 rounded-lg mx-auto">
        <h2 className="text-center text-4xl">Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="text-base">Confirm Password</span>
            </label>
            <input
              type={confirmShow ? "text" : "password"}
              placeholder="password"
              name="confirmPassword"
              required
              className="input input-bordered"
            />
            <p onClick={() => setConfirmShow(!confirmShow)}>
              <small>
                {confirmShow ? <span>Hide Password</span> : <span>Show Password</span>}
              </small>
            </p>
          </div>
          <div className="form-control mt-5">
            <input
              type="submit"
              value="Sign Up"
              className="btn bg-secondary capitalize text-xl border-none hover:bg-orange-300 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="label flex justify-center">
              Already have an account?
              <Link to="login" className=" link link-hover text-primary">
                Login
              </Link>
            </label>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="border-b h-1 w-full border-gray-300"></div>
            <span>or</span>
            <div className="border-b h-1 w-full border-gray-300"></div>
          </div>
          <div className="form-control  mt-4">
            <button className="btn bg-white text-base flex justify-center items-center border-gray-300 gap-2 hover:bg-secondary text-black">
              <img
                className="w-7 h-7"
                src="https://i.postimg.cc/4NhHcV5v/google.png"
                alt=""
              />
              <span className="capitalize">Continue With Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
