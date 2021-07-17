import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../utils/mutations';

import Auth from '../utils/auth';

import { searchByIngredient } from '../utils/API';
import { searchRandomRecipe } from '../utils/API';

const SearchCard = () => {

    return (
        <>
            <div className="flex flex-col w-1/3 bg-blue-200">
                <h2>Recipe Search</h2>
                <form>

                    <div className="flex-row space-between my-2">

                    </div>

                    <div className="flex-row space-between my-2">

                    </div>

                    <div className="flex-row space-between my-2">

                    </div>

                    <div className="flex-row space-between my-2">

                    </div>

                    <div className="flex-row flex-end">
                        <button className="flex justify-center bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Submit Search</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SearchCard;