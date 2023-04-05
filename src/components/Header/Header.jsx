import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";

const Header = () => {
  return (
    <div className="w-full py-6 header  bg-black  ">
      <nav className="flex max-w-6xl items-center justify-center mx-auto ">
        <img src={logo} alt="" />
        <div className="ml-auto">
          <a href="/">Shop</a>
          <a href="/orders">Order Review</a>
          <a href="/inventory">Manage Inventory</a>
          <a href="/login">Login</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
