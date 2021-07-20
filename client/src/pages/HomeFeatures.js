import React from 'react'
import placeholder from '../images/placeholder.jpg';



function HomeFeatures() {
  return (
    <div>
    
      <div>
        <h2>Common Features</h2>
        <img className="rounded-md h-54" src={placeholder} alt="a table full of meals" />
      </div>

      <div>
        <h2>FAQ</h2>
        <ul>
          <li>
            Which browser support "read outloud" feature? Use Microsoft Edge and Mozilla Fire Fox for best experience. Google Chrome has issues with sound quality and length of speech
          </li>
          <li>
            What is your data source? Spoonacular API - https://spoonacular.com/food-api
          </li>
        </ul>  
      </div>
        <h2>About Us</h2>

      <div>
        <h2>About Us</h2>
        <p>
          We are team BABA, four students at UNC's Full Stack Web Development Boot Camp, 2021. Recipes Outloud application is our graduation project and displays a wide spectrum of coding skills that we mastered as aspiring developers.
          <br/>
          We all come from different backgrounds with different abilities and Recipes Outloud is a creation that manifests our ability to work as a team. 
        </p>
        <ul>
          <li>
            Broc Crook - https://github.com/bac5806 
          </li>
          <li>
            Abner Toribio-Vazquez - https://github.com/AbnerTor
          </li>
          <li>
            Brian McMullen - https://github.com/MrBmmc
          </li>
          <li>
            Ali Aran - https://github.com/AranATA
          </li>
        </ul> 
      </div>

</div>
  )
}

export default HomeFeatures
