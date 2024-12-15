var apiKey = "16887fafcd130b5e54f78f627dbbb936"; 
let chart; 

function showSuggestions() {
    var input = document.getElementById('location-search').value.trim();
    var suggestions = document.getElementById('suggestions');

    if (input.length > 0) {
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
}

document.addEventListener('click', (event) => {
    var searchBar = document.getElementById('location-search');
    var suggestions = document.getElementById('suggestions');

    if (!searchBar.contains(event.target) && !suggestions.contains(event.target)) {
        suggestions.style.display = 'none';
    }
});

function selectSuggestion(location) {
    var searchBar = document.getElementById('location-search');
    searchBar.value = location;
    document.getElementById('suggestions').style.display = 'none';
}

function selectAllPollutants() {
    var checkboxes = document.querySelectorAll('.pollutants input[type="checkbox"]');
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
async function fetchAirQualityData() {
    var location = document.getElementById('location-search').value;
    var startDate = document.getElementById('start-date').value;
    var endDate = document.getElementById('end-date').value;

    if (!location || !startDate || !endDate) {
        alert("Please fill in all fields!");
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        alert("End date must be after start date!");
        return;
    }

    var selectedPollutants = Array.from(
        document.querySelectorAll('.pollutants input:checked')
    ).map(input => input.value);

    if (selectedPollutants.length === 0) {
        alert("Please select at least one pollutant!");
        return;
    }

    try {
        var geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
        );
        var geoData = await geoResponse.json();

        if (!geoData.length) {
            alert("Invalid location!");
            return;
        }

        var { lat, lon } = geoData[0];

        var airQualityData = await fetchPollutantData(lat, lon, selectedPollutants, startDate, endDate);

        updateChart(airQualityData, selectedPollutants, startDate, endDate);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching the data.");
    }
}

// Get air quality based on lat/lon and dates
async function fetchPollutantData(lat, lon, pollutants, startDate, endDate) {
    var startTime = new Date(startDate).getTime() / 1000; 
    var endTime = new Date(endDate).getTime() / 1000; 

    var response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${startTime}&end=${endTime}&appid=${apiKey}`
    );
    var data = await response.json();

    var timeSeries = data.list.map(entry => ({
        date: new Date(entry.dt * 1000).toISOString().split("T")[0], 
        components: entry.components,
    }));

    return timeSeries.reduce((acc, entry) => {
        pollutants.forEach(pollutant => {
            if (!acc[pollutant]) acc[pollutant] = [];
            acc[pollutant].push({ date: entry.date, value: entry.components[pollutant] });
        });
        return acc;
    }, {});
}

function updateChart(airQualityData, pollutants, startDate, endDate) {
    var labels = airQualityData[pollutants[0]].map(data => data.date);

    var datasets = pollutants.map(pollutant => ({
        label: pollutant.toUpperCase(),
        data: airQualityData[pollutant].map(data => data.value),
        fill: false,
        borderColor: getRandomColor(),
    }));

    if (chart) chart.destroy(); // Deletes chart so it can repopulate a new one each time

    var ctx = document.getElementById("pollutant-chart").getContext("2d");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets,
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: `Air Quality Data (${startDate} to ${endDate})`,
            },
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { title: { display: true, text: "Pollutant Levels" } },
            },
        },
    });
}

function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
}
