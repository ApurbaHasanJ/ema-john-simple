import React, { useState } from "react";
import "./Orders.css";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItem/ReviewItem";
import { removeFromDb } from "../../utilities/fakedb";

const Orders = () => {

    const savedCart = useLoaderData();
    // console.log(products);

    const [cart, setCart] = useState(savedCart)
    const handleRemoveFromCart = (id) =>{
      // console.log(id)
      const remaining = cart.filter(product => product.id !== id);
      setCart(remaining);
      removeFromDb(id)

    }



  return (
    <div className="orders-container grid grid-cols-2 max-w-7xl lg:px-28 mx-auto md:py-5 lg:py-1 md:gap-2 lg:gap-3">
      <div className="cart-products">
        {
          cart.map(product => <ReviewItem
          key={product.id}
          product={product}
          handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>)
        }
      </div>
      <div className="cart-container flex justify-end">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
