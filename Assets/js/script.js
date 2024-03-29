const citySearch = $("#citySearch");
const errorDiv = $("#error");
const cityArray = $('#cityArray');
const newSearch = $('#newSearch');
const cardBodyToday = $('.cardBodyToday');
const cardTodayDate = $('.cardTodayDate');
const cardTodayCity = $('.cardTodayCity');
const tempToday = $('#tempToday');
const windToday = $('#windToday');
const humidityToday = $('#humidityToday');
const fiveDayForecast = $('.fiveDayForecast');
const forecastTitle = $('#forecastTitle');
const cityForecast = $('.cityForecast');

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
	cities.forEach(cityObj => {
		let row = $('<row>');
		let button = $('<button>').text(cityObj.originalCity);
		button.on('click', function() {
			getCity(cityObj.city);
			cityForecast.css({ visibility: 'visible' })
		}) 

		// append to a container on the HTML page
		button.addClass('button');
		row.append(button);

		cityArray.append(row);

	})

};

function cityStore(event) {

	event.preventDefault();
	console.log("working");


	const city = $("#cityInput").val().trim().toLowerCase();

	if (!city) {
		displayMessage("error", "Please enter a city!");
		return;
	}

	const existingCity = cities.find(item => item.city.toLowerCase() === city);

	// If the city is not in our previous cities array
	// add it and save it to local storage
	if (!existingCity) {
		// Add the city to previousCity array
		cities.push({ city: city, originalCity: $('#cityInput').val().trim() });
		// Save the previous cities to local storage
		localStorage.setItem("cities", JSON.stringify(cities));
		renderCityBtns();
	}

	cityForecast.css({ visibility: 'visible' });

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
			getWeather(lat, lon);
			showWeather(lat, lon);
		});
};

function getWeather(lat, lon) {

	weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&lang=english&appid=${key}`;

	fetch(weatherUrl)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			console.log(data);
			console.log(data.list);

			fiveDayForecast.empty();
			forecastTitle.empty();

			const title = $('<h3>').text('5-Day Forecast');
			forecastTitle.append(title);

			data.list.filter(time => time.dt_txt.includes('12:00:00')).forEach(item => {
				const temp = item.main.temp;
				const wind = item.wind.speed;
				const humidity = item.main.humidity;
				const futureDate = item.dt_txt;
				const formattedDate = new Date(futureDate).toLocaleDateString();

				let div = $('<div>');
				let dateListItem = $('<li>').text(`${formattedDate}`).addClass('listItem boldText')
				let tempListItem = $('<li>').text(`Temp: ${temp}°F`).addClass('listItem');
				let windListItem = $('<li>').text(`Wind: ${wind} MPH`).addClass('listItem');
				let humidityListItem = $('<li>').text(`Humidity: ${humidity}%`).addClass('listItem');
				console.log(temp, wind, humidity);

				div.addClass('forecastCard');
				div.append(dateListItem);
				div.append(tempListItem);
				div.append(windListItem);
				div.append(humidityListItem);

				fiveDayForecast.append(div);
			})
		})
};

function showWeather(lat, lon) {


	weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`

	fetch(weatherURL)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			console.log(data);
			console.log(data.list);

			let city = data.name;
			let temp = data.main.temp
			let humidity = data.main.humidity
			let wind = data.wind.speed
			console.log(city);
			cardTodayCity.text(city);
			cardTodayDate.text(date);
			// insert icons
			tempToday.text(`Temp: ${temp} °F`);
			windToday.text(`Wind: ${wind} MPH`);
			humidityToday.text(`Humidity: ${humidity}%`);

			$('#cityInput').val('');
		})


}


function displayMessage(type, message) {
	errorDiv.text(message);
	errorDiv.attr("class", type);
};


citySearch.on('click', cityStore);
newSearch.on('click', cityStore);
// Add event listener for the buttons
// make sure to use event delegation other wise the event won't work when you add another button