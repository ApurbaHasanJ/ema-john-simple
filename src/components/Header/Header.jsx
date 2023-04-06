import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full py-6 header  bg-black  ">
      <nav className="flex max-w-7xl items-center justify-center mx-auto ">
        <img src={logo} alt="" />
        <div className="ml-auto">
          <Link to="/">Shop</Link>
          <Link to="/orders">Order Review</Link>
          <Link to="/inventory">Manage Inventory</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
