import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [cart, setCart] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const { totalProducts } = useLoaderData();

  // const productsPerPage = 10; //TODO make it dynamic

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  //   Way : 1

  //   const pageNumbers = [];
  //   for (let i = 0; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  //   }

  // Way : 2
  const pageNumbers = [...Array(totalPages).keys()];

  const options = [9, 15, 18];

  const handleSelectChange = (event) => {
    setProductsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${productsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, [currentPage, productsPerPage]);

  //   console.log(totalProducts);
  /**
   * GPT
   * 1. DONE: determine the total number of products
   * 2. DONE: decide the total number of products per page
   * 3. DONE: determine the current page
   */

  // old version
  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  // add cart From Fake Data base
  useEffect(() => {
    const storedCart = getShoppingCart();
    const cartProductsId = Object.keys(storedCart);
    fetch("http://localhost:5000/cartProducts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartProductsId),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        console.log("only products in cart", cartProducts);
        const savedCart = [];

        // get id
        for (const id in storedCart) {
          // console.log(id);

          // get product by using id
          const addedProduct = cartProducts.find((product) => product._id === id);

          // get Quantity of the product
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
            // console.log(quantity);
          }
          // console.log(addedProduct);
        }
        setCart(savedCart);
      });
  }, []);

  // Add to cart
  const handleAddToCart = (product) => {
    // console.log(product);
    // const newCart = [...cart, product]
    let newCart = [];
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <>
      <div className="shop-container max-w-7xl mx-auto md:py-5 lg:py-1 md:gap-2 lg:gap-3">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/orders">
              <button className="bg-primary w-full p-2 px-3 rounded-md text-white flex gap-3 justify-center items-center">
                <p className="mr-auto">Review Order</p>
                <FontAwesomeIcon className="pr-2" icon={faRightLong} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* <p>currentPage: {currentPage}</p> */}
      {/* pagination */}
      <div className="text-center my-10 flex gap-2 justify-center ">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`btn  text-black  ${
              currentPage === number
                ? "bg-orange-300 hover:bg-orange-300"
                : "bg-white hover:bg-orange-300"
            }`}
          >
            {number + 1}
          </button>
        ))}
        <select value={productsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
