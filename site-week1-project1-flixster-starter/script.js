const myKey = 'e6baa9605095da55194db1446c5266c6'
let pages = 1
//let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${myKey}&page=${pages}`
const movie_container = document.querySelector(".movies-grid");
const loadBttn = document.getElementById("load-more-movies-btn")
const state = {
    amountPages: 0,
    Searched: "",
}

const movieTracker = 0;
let counter = 1;

const createMovie = (info) => {
    const movie = document.createElement("div");
    const name_of_class = "movieTitle";
    const imgURL = `https://www.themoviedb.org/t/p/original/${info.poster_path}`
    movie.innerHTML = `
    <section class = 'movie-card'>
        <img id = 'movie-poster' src="${imgURL}" alt="${info.title}">
        <h4 id = 'movie-title'>${info.title}<h4>
        <p id = 'movie-votes'>🌟${info.vote_average} </p>
    </section>
    `

    movie_container.appendChild(movie); 
}

async function getMovies(){
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${myKey}&page=${pages}`
    pages++
    const response = await fetch(url)
    const data = await response.json()
    data.results.forEach((url) => {
        createMovie(url);
    });
}

//load more movies
loadBttn.addEventListener('click',getMovies)

//search function
const searchMovies = async (movieName) => {
    movie_container.innerHTML = ""
    const sUrl = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${myKey}&page=${pages}`

    const response = await fetch(sUrl)
    const data = await response.json()
    data.results.forEach((sUrl) => {
        createMovie(sUrl);
    });
}

//
let searched = document.querySelector("#search-form")
searched.addEventListener("submit", (event) => {
    event.preventDefault()
    searchMovies(event.target.search.value)
})

const clearPage = () => {
    movie_container.innerHTML = ""
    pages = 1
    getMovies()
}
//
let clearBttn = document.querySelector("#close-search-btn")
clearBttn.addEventListener("click", clearPage); 

window.onload = () => {
    getMovies()
}



