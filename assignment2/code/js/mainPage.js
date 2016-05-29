/*===============================================================================================================
TEAM 117
Assignment 2, ENG1003
Last Edited: 24/05/2016
Written by Michelle Balestrat, 23838213
===============================================================================================================*/

// Code for the main app page (locations list).


// Get the current date
var currentDate = new Date();
var dateStr = currentDate.forecastDateString();
console.log(dateStr);

//----------------------------------------------------------------------------------------

var weatherData = [];

// Allows functional button clicks
function viewLocation(locationIndex) {

    //Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selected", JSON.stringify(weatherData[locationIndex]));
    //And load the view location page.
    lastIndex = locationIndex;
    location.href = 'viewlocation.html';

}

// Views Current Location
function viewCurrent() {

    //Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selected", "current");
    //And load the view location page.
    location.href = 'viewlocation.html';

}

//----------------------------------------------------------------------------------------

window.onload = function () {
    outputAreaRef = document.getElementById('locList');
    output = '';

    //CURRENT LOCATION
    output += "<li class=\"mdl-list__item mdl-list__item--two-line mdl-list__item--three-line mdl-list__item--four-line\"  onclick=\"location.href = 'javascript:viewCurrent()\';\"><img class=\"mdl-list__item-icon\" id=\"icon0\" src=\"images/loading.png\" class=\"list-avatar\" /><span class=\"mdl-list__item-primary-content\"><span id = \"head1\">Current Location</span>"

    var loc;
    var listofLocations = locationWeatherCache;

    for (i = 0; i < locationWeatherCache.length(); i++) {
        // data = localStorage.getItem(APP_PREFIX + i);
        loc = locationWeatherCache.locationAtIndex(i);

        // Make a call to 
        locationWeatherCache.getWeatherAtIndexForDate(i, dateStr, mainPageWeatherResponse);

    }
    outputAreaRef.innerHTML = output;
}

//----------------------------------------------------------------------------------------

function mainPageWeatherResponse(index, response) // the weather obj
{
    // get the index of the location of this weather obj by calling 
    // var index = locationWeatherCache.getIndexByLatLng(response.lat, response.long);

    //Pull location from cache
    var locRaw = locationWeatherCache.locationAtIndex(index);

    //Extract name of location
    var locRawName = JSON.stringify(locRaw.nick);
    var loc = locRawName.split('"').join('');

    //Extract Weather from location
    var key = locRaw.lat + ',' + locRaw.long + ',' + dateStr;
    var weatherInfoRaw = locRaw.forecasts[key];

    //Store weather data for viewing purposes
    weatherData.push(locRaw);

    //Get the summary
    var weatherInfo = JSON.stringify(weatherInfoRaw.data[0].summary);
    var summary = weatherInfo.split('"').join('');

    //Get the Lo Temps
    var loTemp = JSON.stringify(weatherInfoRaw.data[0].temperatureMin);
    var loCel = loTemp.split('"').join('');

    //Get the Hi Temps
    var hiTemp = JSON.stringify(weatherInfoRaw.data[0].temperatureMax);
    var hiCel = hiTemp.split('"').join('');

    //Get Icon
    var iconR = JSON.stringify(weatherInfoRaw.data[0].icon);
    var icon = iconR.split('"').join('');


    // Generate the output
    output += "<li class=\"mdl-list__item mdl-list__item--two-line mdl-list__item--three-line mdl-list__item--four-line\"  onclick=\"location.href = 'javascript:viewLocation(" + index + ")\';\"><img class=\"mdl-list__item-icon\" id=\"icon0\" src=\"images/" + icon + ".png\" class=\"list-avatar\" /><span class=\"mdl-list__item-primary-content\"><span id = \"head1\">" + loc + "</span><span id=\"condition 0\" class=\"mdl-list__item-sub-title\">" + summary + "</span><span id=\"low 0\" class=\"mdl-list__item-sub-title\">Min &deg;C: " + loCel + "</span><span id=\"high 0\" class=\"mdl-list__item-sub-title\">Max &deg;C: " + hiCel + "</span>"

    outputAreaRef.innerHTML += output;
}