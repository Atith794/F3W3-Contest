
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function getCurrentImageOfTheDay() {
    const currentDate = getCurrentDate();
    // console.log(currentDate);
    getImageOfTheDay(currentDate);
}


function getImageOfTheDay(date) {
  
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a`)
        .then(response => response.json())
        .then(data => {
            
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <h1>Picture on ${date}</h1>
                <img src="${data.url}" alt="${data.title}" id="img1">
                <h2 id="head3">${data.title}</h2>
                <p>${data.explanation}</p>
            `;
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function handleSubmit(event) {
    event.preventDefault(); 
    
    const selectedDate = document.getElementById('search-input').value;
    getImageOfTheDay(selectedDate);
}


const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', handleSubmit);

function saveSearch(date) {
    
    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    searches.push(date);

    localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    const searchHistoryList = document.getElementById('search-history');

    searchHistoryList.innerHTML = '';

    searches.forEach(search => {
        const listItem = document.createElement('li');
        listItem.textContent = search;
        listItem.addEventListener('click', () => {
            getImageOfTheDay(search);
        });

        searchHistoryList.appendChild(listItem);
    });
}
window.addEventListener('load', getCurrentImageOfTheDay);
