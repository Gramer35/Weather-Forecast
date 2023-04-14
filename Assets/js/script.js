const citySearch = $('#citySearch');
const cityInput = $('#cityInput');


function cityFetch(event) {
    event.preventDefault();
    console.log('working');

    const city = cityInput.value;
    
    if (city === "") {
        displayMessage('error', 'Please enter a city!');
    };

    localStorage.setItem('city', city);

};





citySearch.on('click', cityFetch);