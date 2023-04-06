import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);

    // add cart From Fake Data base 
    useEffect(() =>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        // get id
        for(const id in storedCart){
            // console.log(id);

            // get product by using id
            const addedProduct = products.find(product =>product.id === id);

            // get Quantity of the product
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                // console.log(quantity);
            }
            // console.log(addedProduct);
        }
        setCart(savedCart);

    },[products])

    // Add to cart
    const handleAddToCart = (product) => {
        // console.log(product);
        // const newCart = [...cart, product]
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container max-w-7xl mx-auto md:py-5 lg:py-1 md:gap-2 lg:gap-3'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}
                >
                    <Link to='/orders'>
                    <button className='bg-primary w-full p-2 px-3 rounded-md text-white flex gap-3 justify-center items-center'>
                        <p className='mr-auto'>Review Order</p>  
                        <FontAwesomeIcon className='pr-2'  icon={faRightLong} />
                    </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;