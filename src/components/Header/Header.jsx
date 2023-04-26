import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { toast } from "react-hot-toast";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
        toast.success("Log Out Successfully");
      })
      .catch((err) => {
       console.error(err.message);
      });
  };
  console.log(user);
  return (
    <div className="w-full py-6 header  bg-black  ">
      <nav className="flex max-w-7xl items-center justify-center mx-auto ">
        <img src={logo} alt="" />
        <div className="ml-auto">
          <Link to="/">Shop</Link>
          <Link to="/orders">Order Review</Link>
          <Link to="/inventory">Manage Inventory</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
          {user && (
            <span className="text-orange-300">
              welcome{user.email}{" "}
              <button
                onClick={handleLogOut}
                className="btn bg-secondary capitalize text-xl border-none hover:bg-orange-300 text-black"
              >
                Log Out
              </button>
            </span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
