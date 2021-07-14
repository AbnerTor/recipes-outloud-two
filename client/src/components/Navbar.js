import React from 'react';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import { GiCookingPot } from 'react-icons/gi';
import { IoMenuOutline } from 'react-icons/io5';
import Auth from '../utils/auth';

// *toggle here is experimental at the moment - new push
const Navbar = ({ toggle }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav className='flex flex-row bg-red-400 text-black font-mono' role='navigation'>

      <div className='flex justify-between items-center h-16 relative shadow-sm'>

        <div>
          {Auth.loggedIn() ? (
            <>
              <div className='pr-8 md:block  hidden'>
                <Link to='/me' className='p-4'>
                  {Auth.getProfile().data.username}'s profile
                </Link>
                <button className="btn btn-lg btn-light m-2" onClick={logout}>Sign out</button>
                <Link to='/about' className='p-4'>
                  About
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Sign in
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
          <IconContext.Provider value={{ color: 'green', size: '2.75rem' }}>
            <div>
              <IoMenuOutline />
            </div>
          </IconContext.Provider>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;