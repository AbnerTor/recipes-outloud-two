import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar';
import SpeakButton from '../components/SpeakButton';
import { recipeStepsById, recipeIngredientsById, recipeSummaryById } from '../utils/API';

const TestSpeakPage = () => {

  const { id: recipeId } = useParams();
  // create state for holding returned spoonacular api data
  const [recipe, setRecipe] = useState({});

  useEffect(async () => {
    const recipeData = {};
    try {
      const recipeStepsResponse = await recipeStepsById(recipeId)
      recipeData.steps = await recipeStepsResponse.json()

      const recipeIngredientsResponse = await recipeIngredientsById(recipeId)
      recipeData.ingredients = await recipeIngredientsResponse.json()

      const recipeSummaryResponse = await recipeSummaryById(recipeId)
      recipeData.summary = await recipeSummaryResponse.json()

      setRecipe(recipeData);

    } catch (e) {
      console.error(e);
    }
  }, [recipeId]);

  return (

    <>
      <div>

        <h2 className="py-3 bg-red-400 text-xl flex justify-center">
          {recipe.summary
            ? `Viewing ${recipe.summary.title}  `
            : 'YOU SO HUNGRY YOU MISSED THE FOOD'}
        </h2>
        <div className="flex flex-row mr-20">
          <div className="w-2/3 bg-green-400 text-xl ml-20 pl-5 pt-5">
            {
              recipe.summary && (
                <>
                  <h2 className="flex justify-center mr-8">{recipe.summary.title}</h2>

                  <SpeakButton wordsToSpeak={recipe.summary.summary} />

                  <p dangerouslySetInnerHTML={{ __html: recipe.summary.summary }}></p>


                </>
              )
            }
          </div>
          <Navbar className="flex w-1/3 " />
        </div>

      </div>

    </>
  )
}

export default TestSpeakPage;