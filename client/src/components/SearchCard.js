import React from 'react';
import '../App.css';

function SearchCard(props) {
  return (
    <div>

      <div>
        <h4>{props.title}</h4>
        <div>
          <div className="card-logo">
          </div>
          <p className='features'>
            {props.kcal} kcal
          </p>
        </div>
      </div>

      <div>
        <img src={props.image} alt={`Recipe ${props.id}`}
         />
      </div>

    </div>
  );
};
export default SearchCard;