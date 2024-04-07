const filmTitle = document.getElementById('title');
const runTime = document.getElementById('runtime');
const filmInfo = document.getElementById('film-info');
const showTime = document.getElementById('showtime');
const ticketNum = document.getElementById('ticket-num');
const button = document.getElementById('buy-ticket');
const poster = document.getElementById('poster');
const filmList = document.getElementById('films');

filmList.replaceChildren();

function getAllFilms(id = 1) {
    fetch(`http://localhost:3000/films/${id}`)
    .then(res => res.json())
    .then(item => {
        setPosterDetails(item);
    })
    .catch(error => {
        console.error("Error fetching film:", error);
    });
}

// Set poster details
function setPosterDetails(item) {
    filmTitle.innerHTML = item.title;
    runTime.innerHTML = `${item.runtime} minutes`; // Corrected template literal
    filmInfo.innerHTML = item.description;
    showTime.innerHTML = item.showtime;
    poster.src = item.poster;
    const remainingTickets = item.capacity - item.tickets_sold;
    ticketNum.innerHTML = remainingTickets;
    ticketNumber(remainingTickets);
}

function listFilms() {
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(items => {
        items.forEach(film => {
            let filmItem = document.createElement('li');
            filmItem.textContent = film.title.toUpperCase();
            filmList.appendChild(filmItem); // Corrected method name
            filmItem.addEventListener('click', () => {
                setPosterDetails(film);
            });
        });
    })
    .catch(error => {
        console.error("Error fetching film list:", error);
    });
}

function ticketNumber(remainingTickets) {
    button.addEventListener('click', () => {
        if (remainingTickets > 0) {
            remainingTickets -= 1;
            ticketNum.textContent = remainingTickets;
            if (remainingTickets === 0) {
                button.textContent = "Sold Out";
            }
        }
    });
}

function initialize() {
    getAllFilms();
    listFilms();
}

// Initialize the application
initialize();