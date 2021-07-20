import React from 'react'
import placeholder from '../images/placeholder-small.jpg';



function HomeFeatures() {
  return (
    <div>
    
      <div>
        <div>
            <img className="rounded-md h-54" src={placeholder} alt="a table full of meals" />
        </div>
        <h2>COMMON FEATURES</h2>
      </div>

      <div>
        <div>
          <img className="rounded-md h-54" src={placeholder} alt="a table full of meals" />
        </div>
        <h2>FAQ</h2>
        
        <ul>
          <li>
            Which browser support "read outloud" feature? <span className="italic">Use Microsoft Edge and Mozilla Fire Fox for best experience. Google Chrome has issues with sound quality and length of speech.</span>
          </li>
          <li>
            What is your data source? <span className="italic">Spoonacular API - https://spoonacular.com/food-api</span>
          </li>
          <li>
            How long it took to create "Recipes Outloud"? <span className="italic">Everyone tried to spare as much time as possible out of their regular job routines over a two week time frame.</span>
          </li>
        </ul>  
      </div>
      
      <div>
        <div>
          <img className="rounded-md h-54" src={placeholder} alt="a table full of meals" />
        </div>
        <h2>ABOUT US</h2>
        <p>
          We are team BABA, four students at UNC's Full Stack Web Development Boot Camp, 2021. Recipes Outloud application is our graduation project and displays a wide spectrum of coding skills that we mastered as aspiring developers.
          <br/>
          We all come from different backgrounds with different abilities and Recipes Outloud is a creation that manifests our ability to work as a team. 
        </p>
        <ul>
          <li>
            Broc Crook | <a href="https://github.com/bac5806" target="blank">@GitHub</a>
          </li>
          <li>
            Abner Toribio-Vazquez | <a href="https://github.com/AbnerTor" target="blank">@GitHub</a>
          </li>
          <li>
            Brian McMullen | <a href="https://github.com/MrBmmc" target="blank">@GitHub</a>
          </li>
          <li>
            Ali Aran | <a href="https://github.com/AranATA" target="blank">@GitHub</a>
          </li>
        </ul> 
      </div>

</div>
  )
}

export default HomeFeatures
