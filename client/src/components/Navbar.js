import React from 'react';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import { GiCookingPot } from 'react-icons/gi';
import { IoMenuOutline } from 'react-icons/io5';

const Navbar = ({ toggle }) => {
  return (
    <nav
      className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono'
      role='navigation'
    >      
      <Link to='/' className='px-12 flex items-center'>
        <IconContext.Provider value={{ color: 'green', size: '3.5rem' }}>
          <div>
          <GiCookingPot/>
          </div>
        </IconContext.Provider>
        <div className='pl-4 text-green'>RECIPES OUTLOUD</div>
      </Link>

      <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
        <IconContext.Provider value={{ color: 'green', size: '2.75rem' }}>
          <div>
          <IoMenuOutline/>
          </div>
        </IconContext.Provider>
      </div>

      <div className='pr-8 md:block  hidden'>
        <Link to='/' className='p-4'>
          Sign-in
        </Link>
        <Link to='/menu' className='p-4'>
          Sign-up
        </Link>
        <Link to='/about' className='p-4'>
          About
        </Link>
      </div>
      
    </nav>
  );
};

export default Navbar;