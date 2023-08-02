const apiKey = '4b372437'; 

function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
            .then(response => response.json())
            .then(data => displayMovies(data.Search))
            .catch(error => console.log(error));
    }
}

function displayMovies(movies) {
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';
    if (movies) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.innerHTML = `
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <img src="${movie.Poster}" alt="${movie.Title}">
            `;
            movieResults.appendChild(movieCard);
        });
    } else {
        movieResults.innerHTML = '<p>No movies found.</p>';
    }
}

function createPlaylist() {
    const playlistName = document.getElementById('playlistName').value;
    const isPrivate = document.getElementById('isPrivate').checked;

    const existingPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];

    const newPlaylist = {
        name: playlistName,
        private: isPrivate,
        movies: [] 
    };

    existingPlaylists.push(newPlaylist);

    localStorage.setItem('playlists', JSON.stringify(existingPlaylists));

    document.getElementById('playlistName').value = '';
    document.getElementById('isPrivate').checked = false;

    displayUserPlaylists();
}

function displayUserPlaylists() {
    const playlistSection = document.getElementById('playlistSection');
    playlistSection.innerHTML = '';

    const existingPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];

    existingPlaylists.forEach(playlist => {
        const playlistCard = document.createElement('div');
        playlistCard.innerHTML = `
            <h3>${playlist.name}</h3>
            <p>${playlist.private ? 'Private' : 'Public'}</p>
        `;
        playlistSection.appendChild(playlistCard);
    });
}

displayUserPlaylists();

