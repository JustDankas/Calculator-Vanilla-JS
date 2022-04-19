
//getMealById("52772");


const meals = document.getElementById("meals");
const favMealsContainer = document.getElementById("fav-meals-c");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.querySelector(".input-bar");

const mealPopup = document.getElementById('meal-popup');
const mealInfoEl = document.getElementById('meal-info');
const closePopupBtn = document.getElementById('close-popup');

getRandomMeal();
fetchFavMeals();
async function getRandomMeal(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    console.log(randomMeal);
    addMeal(randomMeal,true);
}

async function getMealById(id){
   const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
   const respData = await resp.json();
   
    const meal = respData.meals[0];
    
    return meal;
}


async function searchMeal(term){
   const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+term);
   const respData = await resp.json();
   
   const meal = respData.meals;
   
   return meal;
}

function addMeal(mealData,random=false){
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `<div class="meal-header">
    ${random?`<span class="random">
    Random Meal
</span>`: ""}
    
    <img id="meal-img" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
</div>
<div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="fav-btn"><i class="fas fa-heart"></i></button>
</div>
</div>`;

    const addBtn = meal.querySelector(".meal-body .fav-btn");

    // ADD TO FAV HEART BUTTON CLICKED
    addBtn.addEventListener("click",()=>{
        if(addBtn.classList.contains("active")){
            removeMealLS(mealData.idMeal);
            addBtn.classList.remove("active");
        }else{
            addMealLS(mealData.idMeal);
            addBtn.classList.add("active");
        }
        
        fetchFavMeals();
    });

    meal.querySelector("#meal-img").addEventListener("click",()=>{
        showMealInfo(mealData);
    })

    meals.appendChild(meal);

}

function addMealLS(mealId){
    const mealIds = getMealsLS();
    localStorage.setItem("mealIds",JSON.stringify([...mealIds,mealId]));

}

function removeMealLS(mealId){
    const mealIds = getMealsLS();
    
    localStorage.setItem("mealIds",JSON.stringify(
    mealIds.filter((id)=>id
    !==mealId))
    );
}

function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"))

    return mealIds===null? []:mealIds;
}

async function fetchFavMeals(){
    //CLEAR FAV MEALS
    favMealsContainer.innerHTML = '';

    const mealIds = getMealsLS();

    

    for(let i=0; i <mealIds.length;i++){
        const mealId = mealIds[i];
      let  meal = await getMealById(mealId);
        addFavMeal(meal);
    }

    
}

function addFavMeal(mealData){
    const favMeal = document.createElement('li');
    
    // Create list item with an img for the fav meal
    favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" 
    alt="${mealData.strMeal}"/>
    <span>${mealData.strMeal}</span>
    <button class="clear">
    <i class="fa-solid fa-circle-xmark"></i>
    </button>`;

    const btn = favMeal.querySelector(".clear");

    btn.addEventListener("click",()=>{
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    });


favMealsContainer.appendChild(favMeal);

}

searchBtn.addEventListener("click", async ()=>{
    //Clear meals container
    meals.innerHTML = "";

    const search = searchInput.value;
    
    const mealsTable = await searchMeal(search);

    if(mealsTable){
        mealsTable.forEach(element => {
            addMeal(element);
        });
    }
});

closePopupBtn.addEventListener("click",()=>{
    mealPopup.classList.add("hidden");
});


function showMealInfo(mealData){
    mealInfoEl.innerHTML = '';
    const mealEl = document.createElement("div");

    const ingredients = [];
    for(let i=1;i<20;i++){
        if(mealData['strIngredient'+i]){
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`);
        }else break;
    }

        mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">

    <div>
        <p>${mealData.strInstructions}
        </p>
        <ul>
            ${ingredients.map((ingr)=>
                `<li>${ingr}</li>`
            ).join("")}
        </ul>`;
    mealInfoEl.appendChild(mealEl)
    mealPopup.classList.remove("hidden");
}