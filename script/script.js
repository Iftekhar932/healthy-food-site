// HTML Elements
const foodBoxContainer = document.getElementById("boxContainerID");
const searchBox = document.getElementById("searchTextBox");
const singleFoodDetail = document.getElementById("foodDetails");
const oneClickScrollButtons = document.querySelectorAll(".linkButton"); // anchorTags

// get every anchor tag and put listeners to them for one click scrolling function
for (let i = 0; i < oneClickScrollButtons.length; i++) {
  const element = oneClickScrollButtons[i];
  element.addEventListener("click", () => {
    if (element.textContent.includes("top" || "recipes")) {
      return scroller("top");
    } else if (element.textContent.includes("bottom")) {
      return scroller("bottom");
    }
  });
}
// food api fetch
let searchText;
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const urlByID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const getDetails = async () => {
  // loading animation after search
  foodBoxContainer.innerHTML = "<div class='lds-hourglass'></div>";
  try {
    // browse every matched food and display
    const response = await fetch(url + searchText);
    const result = await response.json();

    // if no search result found
    if (result.meals == null) {
      foodBoxContainer.innerHTML = "<p>Not Found</p>"; // ⚠️animation and this text has ⚠️to be centered in 1268px responsive screen⚠️
      return;
    }

    // to remove loading animation
    foodBoxContainer.innerHTML = "";

    result?.meals?.map(async (foodInfo) => {
      const foods = foodInfo;
      // single box model to display food HTML
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
        // finding food by id to get each food's details
        const response = await fetch(urlByID + foods?.idMeal);
        const result = await response.json();
        const food = result.meals[0];

        // getting 2 object's string values and making an array out of them which'll have elements of those consisting 2 string value's addition
        const ingredientsWithMeasures = [];
        for (let i = 1; i <= 20; i++) {
          const ingredientKey = food[`strIngredient${i}`];
          const measureValue = food[`strMeasure${i}`];

          if (ingredientKey && measureValue) {
            ingredientsWithMeasures.push(
              `<span>${ingredientKey} - ${measureValue}</span> </br>`
            );
          }
        }

        // we need 'embed' instead of 'watch' in the link here for iframe tag so replaced it
        let youtubeLink = food.strYoutube.replace("/watch?v=", "/embed/");

        // food's detail displayed individually in this box
        const individualFoodDetails = `
          <div id="aligned-boxes" class="aligned-boxes">
          <div class="img-container">
            <img
              src="${food.strMealThumb}"
              alt=""
            />
          </div>
          <div class="texts">
            <h1>${food.strMeal}</h1>
            <h5>Area: ${food.strArea}</h5>
            <h5>Category: ${food.strCategory}</h3>
            <p class='singleBoxDescription'>
           ${food.strInstructions}
            </p>
            <h4>Ingredients:</h1>
            <p class='ingredientsNames'>
            ${ingredientsWithMeasures.join(" </br>")}
           </p>
          </div>
          <a href='${food.strSource}'>Click this link for Source </a>
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

        // adding classes for media query responsive design and displaying boxes
        foodBoxContainer.classList.add("individual-box-container");
        foodBoxContainer.innerHTML = individualFoodDetails;
        document.getElementById("aligned-boxes").classList.add("individualOne");
      };
    });
  } catch (error) {
    console.error(error, "line 122");
  }
};

// function for input element that is used to search foods
searchBox?.addEventListener("keyup", (e) => {
  searchText = e.target.value;
  // if blank then nothing happens
  if (searchText === "") {
    return;
  }
  // if pressed "enter" button with search text in it, input field becomes empty and 'bottom' button appears on navbar
  if (e.key === "Enter") {
    foodBoxContainer.innerHTML = ""; // emptying previous search results
    e.target.value = ""; // emptying previous search text from input box

    document.getElementsByTagName("nav")[0].children[2].style.display =
      "initial"; // third anchor tag of nav element's style change

    // removing classes for media query responsive design and displaying boxes
    document
      .getElementById("aligned-boxes")
      ?.classList?.remove("individualOne");
    foodBoxContainer?.classList?.remove("individual-box-container");

    // function invoked for searching foods
    getDetails();
  }
});

// function for page to scroll on one click
function scroller(direction) {
  direction === "bottom"
    ? window.scrollTo(0, document.body.scrollHeight)
    : window.scrollBy(document.body.scrollHeight, 0);
}
