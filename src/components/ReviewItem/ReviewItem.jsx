import React from "react";
import "./ReviewItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { id, img, price, name, quantity } = product;
  return (
    <div className="review-item rounded-lg mb-6 p-2 pr-6 flex items-center shadow-xl border-2 border-slate-300">
      <img className="w-32 h-auto rounded-md" src={img} alt="CartProduct" />
      <div className="review-details w-96 ml-4">
        <p className="font-medium text-xl mb-2">{name}</p>
        <p className="text-lg mb-2">
          Price: <span className="text-primary">${price}</span>
        </p>
        <p className="text-lg mb-2">
          Order Quantity: <span className="text-primary">{quantity}</span>
        </p>
      </div>
      <div className=" ml-auto flex justify-center items-center">
      <button onClick={() => handleRemoveFromCart(id)} className="w-14 h-14  rounded-full bg-red-200 ">
        <FontAwesomeIcon className="text-red-500 text-2xl" icon={faTrashAlt} />
      </button>
      </div>
    </div>
  );
};

export default ReviewItem;
