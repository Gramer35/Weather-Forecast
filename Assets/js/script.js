const citySearch = $("#citySearch");
const errorDiv = $("#error");
const cityArray = $('#cityArray');
const newSearch = $('#newSearch');
const cardBodyToday = $('cardBodyToday');

const date = moment().format('dddd, MMMM Do YYYY');
const dateTime = moment().format('YYYY-MM-DD HH:MM:SS')

const key = 'c4a5e4d45a58ffa9a62e67d74766af03';

const cities = localStorage.getItem("cities")
  ? // If there are previous cities
  JSON.parse(localStorage.getItem("cities"))
  : // If there are no previous cities
  [];

renderCityBtns();

function getWeatherData(city) {

  let getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

	$(cardBodyToday).empty();

  $.ajax({
		url: getUrlCurrent,
		method: 'GET',
	}).then(function (response) {
		$('.cardTodayCity').text(response.name);
		$('.cardTodayDate').text(date);
		//Icons
		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
		// Temperature
		var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		cardBodyToday.append(pEl);
		//Feels Like
		var pElTemp = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
		cardBodyToday.append(pElTemp);
		//Humidity
		var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		cardBodyToday.append(pElHumid);
		//Wind Speed
		var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		cardBodyToday.append(pElWind);
		//Set the lat and long from the searched city
		var cityLon = response.coord.lon;
		// console.log(cityLon);
		var cityLat = response.coord.lat;
		// console.log(cityLat);

		var getUrlUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}`;

		$.ajax({
			url: getUrlUvi,
			method: 'GET',
		}).then(function (response) {
			var pElUvi = $('<p>').text(`UV Index: `);
			var uviSpan = $('<span>').text(response.current.uvi);
			var uvi = response.current.uvi;
			pElUvi.append(uviSpan);
			cardTodayBody.append(pElUvi);
			//set the UV index to match an exposure chart severity based on color 
			if (uvi >= 0 && uvi <= 2) {
				uviSpan.attr('class', 'green');
			} else if (uvi > 2 && uvi <= 5) {
				uviSpan.attr("class", "yellow")
			} else if (uvi > 5 && uvi <= 7) {
				uviSpan.attr("class", "orange")
			} else if (uvi > 7 && uvi <= 10) {
				uviSpan.attr("class", "red")
			} else {
				uviSpan.attr("class", "purple")
			}
		});
	});

};


function displayMessage(type, message) {
  errorDiv.text(message);
  errorDiv.attr("class", type);
};


function renderCityBtns() {
  // Make sure to empty out the HTML container so you don't duplicate buttons
  cityArray.empty();

  // create a button for each item in the array (try using .forEach())
  cities.forEach(city => {
    let row = $('<row>');
    let button = $('<button>').text(city);

    // append to a container on the HTML page
    button.addClass('button');
    row.append(button);

    cityArray.append(row);

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


  getWeatherData(city);
}


citySearch.on('click', cityFetch);
newSearch.on('click', cityFetch);
// Add event listener for the buttons
// make sure to use event delegation other wise the event won't work when you add another button