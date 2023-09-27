// HTML Elements
const foodBoxContainer = document.getElementById("box-containerID");

// food api fetch
const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=a`;

/* foodData.filter((d) => {
	if (d.includes("ingredients")) console.log(d);
}); */

let foodData;
const getDetails = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    foodData = result.meals;
  } catch (error) {
    console.error(error);
  }
  return foodData;
};
foodData = getDetails();

console.log("✨ 🌟  foodData:", foodData);

// Setting data and appending elements in HTML body
// idMeal,,strCategory,strArea, strIngredient1(ingredients has to be filtered in an array),strInstructions ,strMeasure3(same as ingredients),strSource,strYoutube
const singleFoodBox = `<div class="aligned-boxes">
<div class="img-container">
  <img src="${strMealThumb}" alt="" />
</div>
<div class="texts">
  <h1>Recipe Title</h1>
  <p>
	I always use JimmyDean chocolates,they are tasty,<br />
	enough to make ice-cream,cake,biscuits and whatsoever....
  </p>
</div>
</div>`;

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
