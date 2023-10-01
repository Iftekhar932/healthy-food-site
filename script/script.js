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
    const response = await fetch(url + searchText);
    const result = await response.json();

    result.meals.map(async (foodInfo) => {
      const foods = foodInfo;
      // single box model HTML
      const singleFoodBox = `
    <div class="img-container">
      <img loading='lazy' src="${foods.strMealThumb}" alt="" />
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

      alignedBoxes.onclick = async () => {
        // finding food by id
        const response = await fetch(urlByID + foods?.idMeal);
        const result = await response.json();
        const food = result.meals[0];

        let ingredientWithMeasures = {};
        /* let ingredientMeasures = [];
        let ingredientsNames = [];
        const k = Object.keys(result.meals[0]);
        console.log(k);
        k.map((kName) => {
          if (kName.includes("Ingredient")) {
            if (foods[kName] !== "" && foods[kName] !== null)
              ingredientsNames.push(foods[kName]);
          }
          if (kName.includes("strMeasure")) {
            if (foods[kName] !== "" && foods[kName] !== null)
              ingredientMeasures.push(foods[kName]);
          }
        }); */
        let mainKeys;
        const k = Object.keys(food);
        k.map((keys) => {
          if (keys.includes("strIngredient")) {
            ingredientWithMeasures[food[keys]] = "";
            mainKeys = keys;
          }
        });

        const measureKeys = Object.keys(food);
        measureKeys.map((measureKey) => {
          if (measureKey.includes("strMeasure")) {
            // console.log(measureKey, " main key " + mainKeys);
            ingredientWithMeasures[mainKeys] = `${food[measureKey]}`;
          }
          console.log(ingredientWithMeasures);
        });
        // we need 'embed' instead of 'watch' in the link here for iframe tag
        let youtubeLink = food.strYoutube.replace("/watch?v=", "/embed/");

        // const ingredientName = ingredientsNames.map((ingredient) => {
        const individualFoodDetails = `
          <div class="aligned-boxes">
          <div class="img-container">
            <img
              src="${food.strMealThumb}"
              alt=""
            />
          </div>
          <div class="texts">
            <h1>${food.strMeal}</h1>
            <p class='singleBoxDescription'>
           ${food.strInstructions}
            </p>
            <h4>Ingredients:</h1>
            <p class='ingredientsNames'>
           </p>
          </div>
          <a href='${food.strSource}'>Click here for Source </a>
          </br>
          </br>
          <iframe
            src=${youtubeLink}
            frameborder=""
            width="100%"
            height="300px"
            allowfullscreen
          ></iframe>
        </div>
          `;
        foodBoxContainer.innerHTML = individualFoodDetails;
        // });
      };
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
    document.getElementsByTagName("nav")[0].children[2].style.display =
      "initial";
    foodBoxContainer.textContent = "";
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
