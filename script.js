const searchForm = document.querySelector('form');
const result = document.querySelector('.result');
const container = document.querySelector('.container');
let search = '';
const AppId = "c21b6a2c";
const AppKey = "38480519ea5b766d5a250f53e05956e5";

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    search = e.target.querySelector('input').value;
    
    fetchApi();
});



async function fetchApi(){
    const bUrl = `https://api.edamam.com/search?q=${search}&app_id=${AppId}&app_key=${AppKey}&to=51`;
    const response = await fetch(bUrl);
    
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results){
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="Image Not Found Sorry!!">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Meal Type : ${result.recipe.mealType}</p>
        <p class="item-data">Health Label : ${result.recipe.healthLabels[0]},${result.recipe.healthLabels[1]}</p>
        </div>

        `
    })
    result.innerHTML = generatedHTML;
}


