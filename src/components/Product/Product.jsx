import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {img, name, price, ratings, seller, quantity, id} = props.product;
    const handleAddToCart = props.handleAddToCart;
    
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
            <button onClick={()=>handleAddToCart(props.product)} className='add-cart-btn'>
                <p>Add To Cart</p>
                <FontAwesomeIcon icon={faCartPlus} />
                
                </button>
        </div>
    );
};

export default Product;