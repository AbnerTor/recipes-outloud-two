import React from 'react';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GiCookingPot } from 'react-icons/gi';
import { IoMenuOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { searchRandomRecipe } from '../utils/API';
import SearchCard from '../components/SearchCard';

const HeaderHome = () => {

    // create state for holding returned spoonacular api data
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    useEffect(() => {
        searchRandom();
    }, []);

      // function to search for random recipes
    async function searchRandom() {
        let recipeData;
        try {
        await searchRandomRecipe()
            .then(response => response.json())
            .then(data => recipeData = data);

        const recipes = recipeData.recipes.map((recipe) => ({
            recipeId: recipe.id,
            title: recipe.title,
            image: recipe.image || '../../images/placeholder.jpg',
        }));
        setSearchedRecipes(recipes);

        } catch (e) {
        console.error(e);
        }
    };


    return (
        <div className="flex w-2/3 flex-col bg-blue-200 mb-10 pt-24 h-96">
            
            <div>
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

            <div className="flex flex-row mr-20 ml-20">
                <section className="flex h-96" id="Search">
                    <figure className="flex rounded">
                        {searchedRecipes.map((recipe) => (
                        <SearchCard key={recipe.recipeId} id={recipe.recipeId} title={recipe.title} image={recipe.image} />
                        ))}
                    </figure>
                </section>
            </div>

        </div>
    )
}

export default HeaderHome;