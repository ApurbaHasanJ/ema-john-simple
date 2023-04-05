import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className=' mx-auto'>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Home;