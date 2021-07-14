import React from 'react';
import { IconContext } from 'react-icons';
import { GiCookingPot } from 'react-icons/gi';
import { IoMenuOutline } from 'react-icons/io5';


const HeaderHome = () => {

    return (
        <div className="flex flex-col bg-blue-200 mb-10 pt-24">
            <Link to='/' className='px-12 flex items-center'>
                <IconContext.Provider value={{ color: 'green', size: '3.5rem' }}>
                    <div>
                        <GiCookingPot />
                    </div>
                </IconContext.Provider>
                <h1 className='pl-4 text-green'>RECIPES OUTLOUD</h1>
            </Link>
            <p className="pl-4">Expand Your Joy of Cooking!</p>
        </div>
    )
}

export default HeaderHome;