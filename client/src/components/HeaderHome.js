import React from 'react';
import { IconContext } from 'react-icons';
import { GiCookingPot } from 'react-icons/gi';
import { IoMenuOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';



const HeaderHome = () => {

    return (
        <div className="flex w-2/3 flex-col bg-blue-200 mb-10 h-96">
            <div>
                <Link to='/' className='px-12 flex'>
                    <IconContext.Provider value={{ color: 'green', size: '3.5rem' }}>
                        <div >
                            <GiCookingPot />
                        </div>
                    </IconContext.Provider>
                    <h1 className='pl-4 pt-5 text-green'>RECIPES OUTLOUD</h1>
                </Link>
                <p className="pl-14">Expand Your Joy of Cooking!</p>


            </div>

        </div>
    )
}

export default HeaderHome;