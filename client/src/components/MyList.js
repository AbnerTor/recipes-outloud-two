// import React from 'react';
// import { Link } from 'react-router-dom';

// const MyList = ({
//   recipes,
//   title,
//   showTitle = true,
//   showUsername = true,
// }) => {
//   if (!recipes.length) {
//     return <h3>No Recipes Yet</h3>;
//   }

//   return (
//     <div>
//       {showTitle && <h3>{title}</h3>}
//       {recipes &&
//         recipes.map((recipe) => (
//           <div key={recipe._id} className="card mb-3">
//             <h4 className="card-header bg-primary text-light p-2 m-0">
//               {showUsername ? (
//                 <Link
//                   className="text-light"
//                   to={`/profiles/${recipe.authors}`}
//                 >
//                   {recipe.authors} <br />
//                   <span style={{ fontSize: '1rem' }}>
//                     had this recipe on {recipe.createdAt}
//                   </span>
//                 </Link>
//               ) : (
//                 <>
//                   <span style={{ fontSize: '1rem' }}>
//                     You had this recipe on {recipe.createdAt}
//                   </span>
//                 </>
//               )}
//             </h4>
//             <div className="card-body bg-light p-2">
//               <p>{recipe.summary}</p>
//             </div>
//             <Link
//               className="btn btn-primary btn-block btn-squared"
//               to={`/recipes/${recipe._id}`}
//             >
//               See this recipe in detail and add notes.
//             </Link>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default MyList;
