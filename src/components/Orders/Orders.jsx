import React, { useState } from "react";
import "./Orders.css";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItem/ReviewItem";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCardAlt } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const savedCart = useLoaderData();
  // console.log(products);

  const [cart, setCart] = useState(savedCart);
  const handleRemoveFromCart = (id) => {
    // console.log(id)
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="orders-container flex  max-w-7xl lg:px-28 mx-auto md:py-5 lg:py-1 md:gap-2 lg:gap-3">
      <div className="cart-products mr-auto">
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container flex justify-end">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/checkout">
            <button className="bg-primary w-full p-2 px-3 rounded-md text-white flex gap-3 justify-center items-center">
              <p className="mr-auto">Proceed Checkout</p>
              <FontAwesomeIcon className="pr-2" icon={faCreditCardAlt} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
