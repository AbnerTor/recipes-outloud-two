import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

import Navbar from '../components/Navbar';
import SpeakButton from '../components/SpeakButton';
import { summarySearch } from '../utils/API';

const Summary = () => {

  const { id: recipeId } = useParams();
  const [recipeData, setRecipeData] = useState({});
  console.log(recipeId)
  
  const handleGetSummary = async (recipeId) => {
    try {
      let summaryResponse = await summarySearch(recipeId);
      console.log(summaryResponse);
      if (!summaryResponse.ok) {
        throw new Error('something went wrong!');
      }

      const result = await summaryResponse.json();
      console.log(result);
       //expected log: {id: 644357, title: "Garlic Shrimp", summary: "If you have roughly <b>45 minutes</b> to spend in …lic Lemon Butter Shrimp)</a> for similar recipes."} - instead there is no mention of it on console, it is skipped.
     
      const summaryData = result.map((recipe) => ({
        id: recipe.id,
        summary: recipe.summary,
        title: recipe.title,
      }));

      console.log(summaryData);
      //this is skipped too
      setRecipeData(summaryData);

    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleGetSummary();
  }, [recipeId]);

  console.log(recipeData);
//this logs as an empty object
//starts to give error on line 49 because nothing is defined in recipeData...
  const linkBody = recipeData.title.replace(/\s+/g, '-').toLowerCase();
  console.log(linkBody);
  const recipeURL = `https://spoonacular.com/${linkBody}-${recipeData.summary.id}`

  return (
    <div>
      <Navbar className="flex w-1/3 " />
      <div className="flex flex-row mt-10">
        <a className="flex flex-col items-center pt-3 mx-2 justify-center rounded-lg" href={recipeURL} target="blank">
          <div className="bg-yellow-400 w-full flex justify-center">
            <h4 className=" py-4" >{recipeData.summary.title}</h4>
          </div>
        </a>
        <SpeakButton wordsToSpeak={recipeData.summary.summary} />
        <div className="bg-yellow-400 w-full flex justify-center">
          <p className=" py-4" >{recipeData.summary.summary}</p>
        </div>
      </div>
    </div>
  );
}
export default Summary;