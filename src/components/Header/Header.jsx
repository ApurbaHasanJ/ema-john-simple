import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'

const Header = () => {
    return (
        <div className=''>
            <nav className="header">
                <img src={logo} alt="" />
                <div>
                <a href="/Order">Order</a>
                <a href="/Order-Review">Order Review</a>
                <a href="/Manage-Inventory">Manage Inventory</a>
                <a href="/Login">Login</a>
                </div>
            </nav>
        </div>
    );
};

export default Header;