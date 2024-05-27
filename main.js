function navigateTo(page) {
    window.location.href = page;
}

function getMovies() {
    return JSON.parse(localStorage.getItem('movies')) || [];
}

function saveMovies(movies) {
    localStorage.setItem('movies', JSON.stringify(movies));
}
