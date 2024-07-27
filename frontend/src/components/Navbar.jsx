import React from 'react';
import logo from '../assets/cubingkeralalogo.png'
import { Link } from 'react-router-dom';


const Navbar = () => {

    return (
        <nav>
            <div className='flex items-center justify-between p-5'>
                <div className='flex items-center gap-1'>
                    <img width={30} src={logo} alt="ck-logo" />
                    <h1 className='text-2xl font-label font-bold lg:block hidden'>Cubing Kerala</h1>
                </div>
                <div className='flex'>
                    <Link to={"/login"}><span className='text-lg font-semibold font-label underline'>Login</span></Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
