import React from 'react';
import '../App.css';

// Save button will be defined in the SearchCard component
// onClick={() => handleSaveRecipe(recipe.recipeId)}

function SearchCard(props) {
  return (
    <div>

      <div>
        <h4>{props.title}</h4>

      </div>

      <div>
        <img src={props.image} alt={`Recipe ${props.id}`}
         />
      </div>

    </div>
  );
};
export default SearchCard;