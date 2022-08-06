let elWrapper = document.querySelector(".movie__wrapper");
let elForm = document.querySelector(".search__form");
let elInputYear = document.querySelector(".form__year");
let elInputRating = document.querySelector(".form__rating");
let elInputCategory = document.querySelector(".form__category");
let elInputSort = document.querySelector(".form__sorting");
let elRenderResult = document.querySelector("#results");
let elMovieTemplate = document.querySelector("#movie_card").content;


let moviesArray = movies.slice(0, 220);


let normolizedMovies = moviesArray.map(function(item) {
    return {
        title: item.Title.toString(),
        categories: item.Categories.split("|"),
        info: item.summary,
        img: `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${item.ytid}`,
        rating: item.imdb_rating,
        year: item.movie_year
    }
})


// Categories
function getCategories(array) {
    let newArray = []

    array.forEach(item => {
        let oneMovieCategories = item.categories;
        oneMovieCategories.forEach(item1 => {
            if (!newArray.includes(item1)) {
                newArray.push(item1)
            }
        })
    });

    return newArray
}
let categoriesArray = getCategories(normolizedMovies).sort();

function renderCategories(array, wrapper) {
    let fragment = document.createDocumentFragment();

    for (const item of array) {
        let newOption = document.createElement("option");
        newOption.textContent = item;
        newOption.value = item;
        fragment.appendChild(newOption);
    }
    
    wrapper.appendChild(fragment);
}
renderCategories(categoriesArray, elInputCategory);


function renderMovies(array, wrapper) {
    wrapper.innerHTML = null;
    elRenderResult.textContent = array.length;

    let fragment = document.createDocumentFragment();

    for (const item of array) {
        let movieTemplate = elMovieTemplate.cloneNode(true);

        movieTemplate.querySelector(".movie__img").src = item.img;
        movieTemplate.querySelector(".movie__title").textContent = item.title;
        movieTemplate.querySelector(".movie__year").textContent = item.year;
        movieTemplate.querySelector(".movie__rating").textContent = item.rating;
        movieTemplate.querySelector("#categories").textContent = item.categories;
        movieTemplate.querySelector(".movie__url").href = item.videoUrl;

        fragment.appendChild(movieTemplate);
    }

    wrapper.appendChild(fragment);

}

renderMovies(normolizedMovies, elWrapper);



elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    let inputYear = elInputYear.value.trim();
    let inputSort = elInputSort.value.trim();
    let inputCategory = elInputCategory.value.trim();
    let inputRating = elInputRating.value.trim();
    
    let filteredArray = normolizedMovies.filter(function(item) {
        let isTrue = inputCategory == "all" ? true: item.categories.includes(inputCategory);
        let validation = item.year >= inputYear && item.rating >= inputRating && isTrue; 
        return validation;
    })

    if (inputSort == "rating_high-low") {
        filteredArray.sort((a, b) => {
            return b.rating - a.rating
        })  
    }

    if (inputSort == "rating_low-high") {
        filteredArray.sort((a, b) => {
            return a.rating - b.rating
        })  
    }

    if (inputSort == "year_high-low") {
        filteredArray.sort((a, b) => {
            return b.year - a.year
        })  
    }

    if (inputSort == "year_low-high") {
        filteredArray.sort((a, b) => {
            return a.year - b.year
        })  
    }

    
    renderMovies(filteredArray, elWrapper);
});