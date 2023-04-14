const citySearch = $('#citySearch');
const errorDiv = $('#error')

function displayMessage(type, message) {
    errorDiv.textContent = message;
    errorDiv.attr('class', type);
}


function cityFetch(event) {
    // debugger;
    event.preventDefault();
    console.log('working');

    const city = $('cityInput').value;
    
    if (!city) {
        displayMessage('error', 'Please enter a city!');
    };

    localStorage.setItem('city', city);

};





citySearch.on('click', cityFetch);