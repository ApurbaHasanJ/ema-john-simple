import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './Cart.css'

const Cart = ({cart, handleClearCart, children}) => {

    // Calculations for cart
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart) {
        // product.quantity = product.quantity || 1;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping * product.quantity;
        quantity = quantity + product.quantity;

    }

    // Tax calculation
    const tax = totalPrice * 7 / 100

    // Grand Total
    const grandTotal = totalPrice + totalShipping + tax;


    return (
        <div className='cart w-72  fixed p-7 rounded-lg shadow-xl '>
                <h2 className=' text-2xl text-center mb-11'>Order Summary</h2>

                {/* Cart Calculations */}
                <div className='mb-12 mr-auto'>
                    <p className=' mr-auto text-base mt-5'>Selected Items: {quantity}</p>
                    <p className=' mr-auto text-base mt-5'>Total Price: ${totalPrice.toFixed(2)}</p>
                    <p className=' mr-auto text-base mt-5'>Total Shipping Charge: ${totalShipping.toFixed(2)}</p>
                    <p className=' mr-auto text-base mt-5'>Tax: ${tax.toFixed(2)}</p>
                    <h2 className='mr-auto text-xl mt-5'>Grand Total: ${grandTotal.toFixed(2)}</h2>
                </div>

                {/* cart btn */}
                <div className='flex flex-col'>
                    <button onClick={handleClearCart} className='bg-error p-2 px-3 rounded-md text-white flex gap-3 justify-center items-center mb-4'>
                        <p className='mr-auto'>Clear Cart</p>  
                        <FontAwesomeIcon className='pr-2' icon={faTrashAlt} />
                    </button>
                    {children}
                    
                </div>
            </div>
    );
};

export default Cart;