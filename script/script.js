// HTML Elements
const foodBoxContainer = document.getElementById("boxContainerID");
const searchBox = document.getElementById("searchTextBox");
const singleFoodDetail = document.getElementById("foodDetails");

// function for "recipes.html" page to scroll on click
function scroller(direction) {
  direction === "bottom"
    ? window.scrollTo(0, document.body.scrollHeight)
    : window.scrollBy(document.body.scrollHeight, 0);
}

// food api fetch
let searchText;
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const urlByID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const getDetails = async () => {
  try {
    // browse every matched food and display
    let foods;
    const response = await fetch(url + searchText);
    const result = await response.json();

    result.meals.map((foodInfo) => {
      foods = foodInfo;
      // single box HTML
      const singleFoodBox = `
    <div class="img-container">
      <img src="${foods.strMealThumb}" alt="" />
    </div>
    <div class="texts">
      <h1>${foods.strMeal}</h1>
      <p>
    ${foods.strInstructions.slice(0, 170)}... \n
    </p>
    </div>`;

      const alignedBoxes = document.createElement("div");
      alignedBoxes.className = "aligned-boxes";
      alignedBoxes.innerHTML = singleFoodBox;
      foodBoxContainer.appendChild(alignedBoxes);

      alignedBoxes.addEventListener("click", async (e) => {
        let food;
        const response = await fetch(urlByID + foods.idMeal);
        const result = await response.json();
        food = result.meals;
        food.map((foodDetails) => {
          const k = Object.keys(foodDetails);
          k.map((kName) => {
            if (kName.includes("Ingredient")) {
              const ingredients = foodDetails[kName];
            }
          });
        });

        const individualFoodDetails = `
        <div class="aligned-boxes">
        <div class="img-container">
          <img
            src="${foods.strMealThumb}"
            alt=""
          />
        </div>
        <div class="texts">
          <h1>${foods.strMeal}</h1>
          <p>
         ${foods.strInstructions}
          </p>

        </div>
        <iframe
          src="https://www.youtube.com/embed/6R8ffRRJcrg"
          frameborder=""
          width="100%"
          height="auto"
          allowfullscreen
        ></iframe>
      </div>
        `;
      });
    });
  } catch (error) {
    console.error(error);
  }
};

searchBox?.addEventListener("keyup", (e) => {
  searchText = e.target.value;
  if (searchText === "") {
    return;
  }
  if (e.key === "Enter") {
    getDetails();
  }
});

// Setting data and appending elements in HTML body
// idMeal,,strCategory,strArea, strIngredient1(ingredients has to be filtered in an array),strInstructions ,strMeasure3(same as ingredients),strSource,strYoutube

/* 


Search meal by name
www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
List all meals by first letter
www.themealdb.com/api/json/v1/1/search.php?f=a
Lookup full meal details by id
www.themealdb.com/api/json/v1/1/lookup.php?i=52772
Lookup a single random meal
www.themealdb.com/api/json/v1/1/random.php
Lookup a selection of 10 random meals (only available to Paypal supporters)
www.themealdb.com/api/json/v1/1/randomselection.php
List all meal categories
www.themealdb.com/api/json/v1/1/categories.php
Latest Meals (only available to Paypal supporters)
www.themealdb.com/api/json/v1/1/latest.php
List all Categories, Area, Ingredients
www.themealdb.com/api/json/v1/1/list.php?c=list
www.themealdb.com/api/json/v1/1/list.php?a=list
www.themealdb.com/api/json/v1/1/list.php?i=list
Filter by main ingredient
www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
Filter by multi-ingredient (only available to Paypal supporters)
www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast,garlic,salt
Filter by Category
www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
Filter by Area
www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

*/
/*
/*

arr.map(f=> {
  const see = f.hasOwnProperty('ingredients')
  console.log(see)

})
*/
