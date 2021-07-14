
  // NOTE TO TEAM: EDIT_RECIPE FUNCTION IS DEFINED IN MYSINGLE.JS - "Read Recipe Aloud" WILL BE AVAILABLE TOO.

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_MYRECIPES} from '../utils/queries';
// import { REMOVE_RECIPE } from '../utils/mutations';
// new push
import Auth from '../utils/auth';

const MySingle = () => {

  const { id } = useParams();

  const [currentMyRecipe, setCurrentMyRecipe] = useState({});

  const { loading, data } = useQuery(QUERY_MYRECIPES);

  return (
    <>
      {currentMyRecipe && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to My Recipes</Link>

          <h2>{currentMyRecipe.name}</h2>

          <p>{currentMyRecipe.description}</p>

          <p>
            <strong>Price:</strong>${currentMyRecipe.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentMyRecipe._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentMyRecipe.image}`}
            alt={currentMyRecipe.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  )


};

export default MySingle;