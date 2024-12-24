const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 8.8, releaseYear: 2010 },
    { title: "The Dark Knight", genre: "Action", rating: 9.0, releaseYear: 2008 },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, releaseYear: 2014 }
];

// Utility functions
const addMovie = (collection, movie) => {
    collection.push(movie);
    displayMovies(collection);
};

const displayMovies = collection => {
    const moviesList = document.getElementById("movies-list");
    moviesList.innerHTML = collection.map(movie => `
                <p>${movie.title} (${movie.releaseYear}) - Genre: ${movie.genre}, Rating: ${movie.rating}</p>
            `).join('');
};

const findHighestRatedMovie = collection => {
    return collection.reduce((highest, movie) => movie.rating > highest.rating ? movie : highest);
};

// Event Listeners
document.getElementById("add-movie-form").addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const rating = parseFloat(document.getElementById("rating").value);
    const releaseYear = parseInt(document.getElementById("releaseYear").value, 10);
    addMovie(movies, { title, genre, rating, releaseYear });
    e.target.reset();
});

document.getElementById("filter-genre-button").addEventListener("click", () => {
    const genre = document.getElementById("filter-genre").value;
    const filteredMovies = movies.filter(movie => movie.genre === genre);
    document.getElementById("filter-results").innerHTML = filteredMovies.map(movie => `
                <p>${movie.title} (${movie.releaseYear}) - Genre: ${movie.genre}, Rating: ${movie.rating}</p>
            `).join('') || `<p>No movies found for genre "${genre}".</p>`;
});

document.getElementById("filter-year-button").addEventListener("click", () => {
    const year = parseInt(document.getElementById("filter-year").value, 10);
    const filteredMovies = movies.filter(movie => movie.releaseYear > year);
    document.getElementById("filter-results").innerHTML = filteredMovies.map(movie => `
                <p>${movie.title} (${movie.releaseYear}) - Genre: ${movie.genre}, Rating: ${movie.rating}</p>
            `).join('') || `<p>No movies found after year "${year}".</p>`;
});

document.getElementById("highest-rated-button").addEventListener("click", () => {
    const highestRated = findHighestRatedMovie(movies);
    document.getElementById("filter-results").innerHTML = `
                <p>Highest Rated Movie:</p>
                <p>${highestRated.title} (${highestRated.releaseYear}) - Genre: ${highestRated.genre}, Rating: ${highestRated.rating}</p>
            `;
});

// Initial Display
displayMovies(movies);