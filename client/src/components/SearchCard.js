import React from 'react';
import '../App.css';

// Save button will be defined in the SearchCard component
// onClick={() => handleSaveRecipe(recipe.recipeId)}

// IMPORTANT NOTE: Pulling the URL link from recipe.title of the summarySearch 

 // "soy-and-ginger-glazed-salmon-with-udon-noodles"

// https://spoonacular.com/soy-and-ginger-glazed-salmon-with-udon-noodles-123456789


function SearchCard(props) {

  const linkBody = props.title.replace(/\s+/g, '-').toLowerCase();
  console.log(linkBody);
  const recipeURL = `https://spoonacular.com/${linkBody}-${props.id}`
  console.log(props.id);
  return (
    <div>
      <a href={recipeURL} target="blank">
        <div>
          <h4>{props.title}</h4>
        </div>
        <div>
          <img src={props.image} alt={`Recipe ${props.key}`}/>
        </div>
      </a>
    </div>
  );
};
export default SearchCard;