

function showSuggestions() {
    const input = document.getElementById('location-search').value.trim();
    const suggestions = document.getElementById('suggestions');

    if (input.length > 0) {
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
}


document.addEventListener('click', (event) => {
    const searchBar = document.getElementById('location-search');
    const suggestions = document.getElementById('suggestions');

    if (!searchBar.contains(event.target) && !suggestions.contains(event.target)) {
        suggestions.style.display = 'none';
    }
});


function selectSuggestion(location) {
    const searchBar = document.getElementById('location-search');
    searchBar.value = location;
    document.getElementById('suggestions').style.display = 'none';
}


function selectAllPollutants() {
    const checkboxes = document.querySelectorAll('.pollutants input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
    });
}

async function getWeatherData(lat, long, apiKey) {
    var date;
    const data = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${apiKey}`)
        .then((res) => res.json())
        .then(response => {
            if(response){
                date = response.list[0].dt; 
            }
        });
    
    return date;
}

async function getDate(lat, long, apiKey){
    const data = await getWeatherData(lat, long, apiKey);
    console.log(data);
}

async function getSearchDate() {
    const location = document.getElementById('location-search').value;
    const apiKey = "16887fafcd130b5e54f78f627dbbb936";

    var lat;
    var long;

    fetch('cityStateToLatLong.json')
        .then((res) => res.json())
        .then(response => {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                if (location == response[i].city) {
                    lat = response[i].latitude;
                    long = response[i].longitude;
                    console.log(latitude);
                    console.log(longitude);
                    break;
                }
            }
        })

    const date = getWeatherData(lat, long, apiKey);
    return date;
    

}

function getUserId() {
    const userId = sessionStorage.getItem('userId');
    console.log('Id: ', userId);
    return userId;
}

async function updatePastSearches() {
    const id = getUserId();
    const users = await getUsers();
    const usersArray = users[id].past_searches;
    const dateArray = users[id].search_date;
    const location = document.getElementById('location-search').value;
    const select = document.getElementById('pastDropdown');
    const date = await getSearchDate();

    usersArray.push(location);
    dateArray.push(date);

    await fetch('http://localhost:3000/update', {
        method: 'PUT',
        body: JSON.stringify({
            id: getUserId(),
            past_searches: usersArray,
            search_date: dateArray,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())

    for (let i = 0; i < usersArray.length; i++) {
        const pastSearch = document.createElement("option");
        const option = usersArray[i];

        pastSearch.textContent = option;
        pastSearch.value = option;
        select.appendChild(pastSearch);
    }
}

//Add location search into database
//Only store city because you already have timestamp
//

window.onload = getUserId;
