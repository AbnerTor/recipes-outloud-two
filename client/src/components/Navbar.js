import React from 'react';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
// *toggle here is experimental at the moment - new push
const Navbar = ({ toggle }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className='flex flex-row justify-end bg-red-400 text-black font-mono w-full justify-center py-5'>

      <div className='flex justify-end items-center h-16 relative underline'>

        <div>
          {Auth.loggedIn() ? (
            <>
              <div className='pr-8 md:block  hidden'>
                <Link to='/me' className='p-4 text-lg'>
                  {Auth.getProfile().data.username}'s profile
                </Link>
                <button className="btn btn-lg btn-light m-2 text-base underline text-lg" onClick={logout}>Sign out</button>

                <Link className="text-lg"to='/about' className='p-4'>
                  About
                </Link>
              </div>
            </>
          ) : (
            <>

              <Link className="btn btn-lg btn-info m-2 text-xl underline" to="/signin">
                Sign in
              </Link>
              <Link className="btn btn-lg btn-light m-2 text-xl underline" to="/">

                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;