import React from 'react';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
// *toggle here is experimental at the moment - new push
const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className='flex flex-row justify-center bg-bRed text-black font-mono w-full justify-center py-5 font-mono'>

      <div className='flex justify-end items-center h-16 relative underline font-mono'>

        <div>
          {Auth.loggedIn() ? (
            <>
              <div className='pr-8 md:block flex items-center'>

                <Link to='/me' className='p-4 text-lg ml-10 font-mono'>
                  {Auth.getProfile().data.username}'s profile
                </Link>
                <button className="btn btn-lg btn-light m-2 text-base underline text-lg" onClick={logout}>Sign out</button>

                <Link className="text-lg p-4 ml-2 md:ml-20" to='/features'>
                  About
                </Link>

                <Link className="text-lg p-4 font-mono" to='/search-recipes'>
                  Search
                </Link>
              </div>
            </>
          ) : (
            <>

              <Link className="btn btn-lg btn-info m-2 text-xl underline font-mono" to="/signin">
                Sign in
              </Link>
              <Link className="btn btn-lg btn-light m-2 text-xl underline font-mono" to="/">

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