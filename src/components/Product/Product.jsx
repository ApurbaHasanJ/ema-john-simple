import React from 'react';
import './Product.css'

const Product = (props) => {
    const {img, name, price, ratings, seller, quantity} = props.product;
    // console.log(props.product)
    return (
        <div className='product'>
            <img src={img} alt="product" />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <h6 className='product-price'>Price: ${price}</h6>
                <p className="manufacturer">Manufacturer: {seller}</p>
                <p className="rating">Rating: {ratings} star</p>
            </div>
            <button className='add-cart-btn'>Add To Cart</button>
        </div>
    );
};

export default Product;