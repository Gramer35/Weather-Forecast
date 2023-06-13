const citySearch = $("#citySearch");
const errorDiv = $("#error");
const cityArray = $('#cityArray');
const newSearch = $('#newSearch');
const cardBodyToday = $('.cardBodyToday');
const cardTodayDate = $('.cardTodayDate');
const cardTodayCity = $('.cardTodayCity');

const date = moment().format('dddd, MMMM Do YYYY');
const dateTime = moment().format('YYYY-MM-DD HH:MM:SS')

const key = 'c4a5e4d45a58ffa9a62e67d74766af03';

const cities = localStorage.getItem("cities")
	? // If there are previous cities
	JSON.parse(localStorage.getItem("cities"))
	: // If there are no previous cities
	[];

renderCityBtns();

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

function cityStore(event) {
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


	getCity(city);
}

function getCity(city) {
	console.log('working again')
	let getUrlCurrent = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;

	fetch(getUrlCurrent)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {

			let lat = data[0].lat;
			let lon = data[0].lon
			getWeather(lat, lon)
		});
};

function getWeather(lat, lon) {

	weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=english&appid=${key}`;

	fetch(weatherUrl)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			console.log(data);
			showWeather(data);
		})

};

function showWeather(data) {
	console.log(data);

	let city = data.city.name;
	cardTodayCity.text(city);
	cardTodayDate.text(date);
	// insert icons
	cardBodyToday.text(`Temp: ${city}`);
	cardBodyToday.text(`Wind: ${city}`);
	cardBodyToday.text(`Humidity: ${city}`);
}


function displayMessage(type, message) {
	errorDiv.text(message);
	errorDiv.attr("class", type);
};


citySearch.on('click', cityStore);
newSearch.on('click', cityStore);
// Add event listener for the buttons
// make sure to use event delegation other wise the event won't work when you add another button