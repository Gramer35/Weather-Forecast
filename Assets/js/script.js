const citySearch = $("#citySearch");
const errorDiv = $("#error");
const cityArray = $('#cityArray');
const newSearch = $('#newSearch');

const cities = localStorage.getItem("cities")
  ? // If there are previous cities
    JSON.parse(localStorage.getItem("cities"))
  : // If there are no previous cities
    [];

renderCityBtns();

function getWeatherData(city) {

}

function displayMessage(type, message) {
  errorDiv.text(message);
  errorDiv.attr("class", type);
}

function renderCityBtns() {
  // Make sure to empty out the HTML container so you don't duplicate buttons
  cityArray.HTML = ("");

  // create a button for each item in the array (try using .forEach())
  cities.forEach(city => {
    let row = $('<row>');
    let button = $('<button>').text(city);

    // append to a container on the HTML page
    cityArray.append(row);
    cityArray.append(button);

  })
  
};

// function moveToSearchedCity() {
//   const searchedCity = './searchedCity.html'
//   $(location).attr('href', searchedCity);

// }

function cityFetch(event) {
  // debugger;
  event.preventDefault();
  console.log("working");

  const city = $("#cityInput").val().trim().toLowerCase();

  if (!city) {
    displayMessage("error", "Please enter a city!");
    return;
  }

  // If the city is not in our previous cities array
  // add it and save it to local storage
  if (!cities.includes(city)) {
    // Add the city to previousCity array
    cities.push(city);
    // Save the previous cities to local storage
    localStorage.setItem("cities", JSON.stringify(cities));
    renderCityBtns();
  }

  const searchedCity = 'Assets/html/searchedCity.html'
  location.assign(searchedCity);

  getWeatherData(city);
}


citySearch.on('click', cityFetch);
newSearch.on('click', cityFetch);
// Add event listener for the buttons
// make sure to use event delegation other wise the event won't work when you add another button