document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    fetchMovies(query);
});

function fetchMovies(query) {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=a2d10c81
`)
        .then(response => response.json())
        .then(data => displayMovies(data.Search))
        .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
    
    if (movies && movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <div class="more-info" data-id="${movie.imdbID}">More Info</div>
            `;
            movieList.appendChild(movieCard);
        });

        document.querySelectorAll('.more-info').forEach(button => {
            button.addEventListener('click', function() {
                const movieId = this.getAttribute('data-id');
                fetchMovieDetails(movieId);
            });
        });
    } else {
        movieList.innerHTML = '<p>No results found.</p>';
    }
}

function fetchMovieDetails(movieId) {
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=a2d10c81
`)
        .then(response => response.json())
        .then(data => displayMovieDetails(data))
        .catch(error => console.error('Error fetching details:', error));
}

function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movie-details');
    movieDetails.style.display = 'block';
    movieDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Year:</strong> ${movie.Year}</p>
    `;
}
