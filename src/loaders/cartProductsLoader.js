import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
  // If cart is in database, I've to use async await instead
  const storedCart = getShoppingCart();
  const cartProductsId = Object.keys(storedCart);
  console.log(cartProductsId);
  const loadedProducts = await fetch("http://localhost:5000/cartProducts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(cartProductsId),
  });
  const products = await loadedProducts.json();

  console.log("products by id", products);

  const savedCart = [];

  for (const id in storedCart) {
    const addedProduct = products.find((p) => p._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      // console.log(addedProduct);
      savedCart.push(addedProduct);
    }
  }
  // console.log(storedCart);

  // console.log(products);
  return savedCart;
};

export default cartProductsLoader;
