import React from 'react';
import '../App.css';

function SearchCard(props) {
// Creating the URL link from recipe.title of the complexSearch results 
  const linkBody = props.title.replace(/\s+/g, '-').toLowerCase();
  console.log(linkBody);
  const recipeURL = `https://spoonacular.com/${linkBody}-${props.id}`
  console.log('props: ', props.id);

  return (
    <div>
      <div className="flex flex-row mt-10">
        <a className="bg-red-400 flex flex-row w-1/2 h-48 items-center" href={recipeURL} target="blank">
          <div>
            <h4>{props.title}</h4>
          </div>
          <div>
            <img src={props.image} alt={`Recipe ${props.id}`} />
          </div>
        </a>
      </div>
    </div>
  );
};

export default SearchCard;