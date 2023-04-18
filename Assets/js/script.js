const citySearch = $("#citySearch");
const errorDiv = $("#error");

const previousCities = localStorage.getItem("previousCities")
  ? // If there are previous cities
    JSON.parse(localStorage.getItem("previousCities"))
  : // If there are no previous cities
    [];

renderCityBtns();

function getWeatherData(city) {}

function displayMessage(type, message) {
  errorDiv.text(message);
  errorDiv.attr("class", type);
}

function renderCityBtns() {
  // Loop over our previousCities array
  // Make sure to empty out the HTML container so you don't duplicate buttons
  // create a button for each item in the array (try using .forEach())
  // append to a container on the HTML page
}

function cityFetch(event) {
  // debugger;
  event.preventDefault();
  console.log("working");

  const city = $("#cityInput").val().trim().toLowerCase();

  if (!city) {
    displayMessage("error", "Please enter a city!");
  }

  // If the city is not in our previous cities array
  // add it and save it to local storage
  if (!previousCities.includes(city)) {
    // Add the city to previousCity array
    previousCities.push(city);
    // Save the previous cities to local storage
    localStorage.setItem("previousCities", JSON.stringify(previousCities));
    renderCityBtns();
  }

  getWeatherData(city);
}

citySearch.on("click", cityFetch);
// Add event listener for the buttons
// make sure to use event delegation other wise the event won't work when you add another button