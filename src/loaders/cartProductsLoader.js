import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async() => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    // If cart is in database, I've to use async await instead
    const storedCart = getShoppingCart();

    const savedCart = [];

    for(const id in storedCart) {
        const addedProduct = products.find(p => p.id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity
            // console.log(addedProduct);
            savedCart.push(addedProduct);
        }
    }
    // console.log(storedCart);


    // console.log(products);
    return savedCart;
}

export default cartProductsLoader;