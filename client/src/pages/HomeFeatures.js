import React from 'react'
import features from '../images/features-small.jpg';
import faq from '../images/faq-small.jpg';
import aboutus from '../images/aboutus-small.jpg';

function HomeFeatures() {
  return (
    <div>
    
      <div>
        <div>
            <img className="rounded-md h-54" src={features} alt="a table full of meals" />
        </div>
        <h2>COMMON FEATURES</h2>
        <div>
          <ul>
            <li>
              ADVANCED SEARCH
              <br/>
              Search recipes with any keyword and filter results with calorie preferences. You can perform your search based on cuisines of different regions (Asian, American...), ingredients (pasta, apples...), dish names (miso soup, pizza...) and more. You can also check any recipe's full details from the original source.
            </li>
            <li>
              MY COLLECTION
              <br/>
              Save the recipe cards that you like to your collection and create your own database of favorites.
            </li>
            <li>
              OUT LOUD
              <br/>
              Once saved, you will be able to listen to your recipe's instructions and other details so that you can free your hands and eyes while cooking. 
            </li>
            <li>
              ADD NOTES (coming soon)
              <br/>
              Cooking takes practice and you can record your experiences by adding notes to your recipe cards. 
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div>
          <img className="rounded-md h-54" src={faq} alt="a table full of meals" />
        </div>
        <h2>FAQ</h2>
        
        <div>
          <ul>
            <li>
              Which browsers support "read outloud" feature? <span className="italic">Use Microsoft Edge and Mozilla Fire Fox for best experience. Google Chrome has issues with sound quality and length of speech.</span>
            </li>
            <li>
              What is your data source? <span className="italic">Spoonacular API - https://spoonacular.com/food-api</span>
            </li>
            <li>
              How long it took to create "Recipes Outloud"? <span className="italic">Everyone tried to spare as much time as possible out of their regular job routines over a two-week time frame.</span>
            </li>
            <li>
              How long it took to create "Recipes Outloud"? <span className="italic">Everyone tried to spare as much time as possible out of their regular job routines over a two-week time frame.</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div>
        <div>
          <img className="rounded-md h-54" src={aboutus} alt="a table full of meals" />
        </div>
        <h2>ABOUT US</h2>
        <p>
          We are Team BABA, a team of four students at UNC's 2021 Full Stack Web Development Boot Camp. "Recipes Out Loud" application is our graduation project and displays a wide spectrum of coding skills that we mastered as aspiring web developers. 
          <br/>
          We all come from different backgrounds with the common goal of learning and discovering how to code. With no prior knowledge or experience in the field, we are successfully finishing an intense program that taught us the newest technologies. "Recipes Out Loud" is not only a manifestation of such knowledge but also our ability to work as a team, at both front end and back end tasks.
          <br/>
          We are very proud to create "Recipes Out Loud" and hope you enjoy it too. 
        </p>
        <div>
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
</div>
  )
}

export default HomeFeatures
