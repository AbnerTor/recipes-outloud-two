import React from 'react';
import '../App.css';

function SearchCard(props) {
  // Creating the URL link from recipe.title of the complexSearch results 
  const linkBody = props.title.replace(/\s+/g, '-').toLowerCase();
  console.log(linkBody);
  const recipeURL = `https://spoonacular.com/${linkBody}-${props.id}`
  console.log('props: ', props.id);

  return (

    <div className="flex flex-row mt-10">
      <a className="flex flex-col items-center pt-3 mx-2 justify-center rounded-lg" href={recipeURL} target="blank">
        <div className="bg-yellow-400 w-full flex flex-col justify-center items-center">
          <img className="rounded-md h-48" src={props.image} alt={`Recipe ${props.id}`} />
          <h4 className=" py-4" >{props.title}</h4>
        </div>
      </a>
    </div>
  );
};

export default SearchCard;
