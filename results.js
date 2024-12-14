
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
