// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var outputAreaRef = document.getElementById("locDate");
var output = "";
var currentDate = new Date();
var dateStr = currentDate.simpleDateString();
var forecastDate = currentDate.forecastDateString();

outputAreaRef.textContent = dateStr;

//-----------------------------------------------------------------------------

var APP_PREFIX = "weatherApp";
var weatherData = [];

var chosenLocation = localStorage.getItem(APP_PREFIX + "-selected");
var chosenLocationObj = JSON.parse(chosenLocation);

//Pull data from localStorage capture

//Extract name of location
var locRawName = JSON.stringify(chosenLocationObj.nick);
var loc = locRawName.split('"').join('');

//Extract co-ordinates for map
var latRaw = JSON.stringify(chosenLocationObj.lat);
var latitude = Number(latRaw.split('"').join(''));

var longRaw = JSON.stringify(chosenLocationObj.long);
var longitude = Number(longRaw.split('"').join(''));

//Get the index from the lat/lng
index = locationWeatherCache.getIndexByLatLng(latitude, longitude);

locationWeatherCache.getWeatherAtIndexForDate(index, forecastDate, viewPageWeatherResponse);

// The part below could be changed by the slider movement.
function viewPageWeatherResponse(index, response) // the weather obj
{

    var locRaw = locationWeatherCache.locationAtIndex(index);

    //Extract Weather from location
    var key = locRaw.lat + ',' + locRaw.long + ',' + forecastDate;
    var weatherInfoRaw = locRaw.forecasts[key];

    //Insert call to API here
    //Perhaps use if/else statement if forecastDate == the current forecast

    //Get the summary
    var weatherInfo = JSON.stringify(weatherInfoRaw.data[0].summary);
    var summary = weatherInfo.split('"').join(''); // Remove commas which cause errors.

    //Get the Lo Temps
    var loTemp = JSON.stringify(weatherInfoRaw.data[0].apparentTemperatureMin);
    var loCel = loTemp.split('"').join('');

    //Get the Hi Temps
    var hiTemp = JSON.stringify(weatherInfoRaw.data[0].apparentTemperatureMax);
    var hiCel = hiTemp.split('"').join('');

    //Get the Chance of Rain
    var precip = JSON.stringify(weatherInfoRaw.data[0].precipProbability);
    var prob = precip.split('"').join('');

    //Get the wind speed
    var wind = JSON.stringify(weatherInfoRaw.data[0].windSpeed);
    var windSp = precip.split('"').join('');

    //Get the barometric pressure
    var pressure = JSON.stringify(weatherInfoRaw.data[0].pressure);
    var baro = pressure.split('"').join('');

    var humidity = JSON.stringify(weatherInfoRaw.data[0].humidity);
    var humid = humidity.split('"').join('');


    //Output to page
    document.getElementById("summary").innerHTML = "<strong>" + summary + "</strong>" + "<br> Chance of Rain: " + precip + "%" + "<br> Max/Min: " + hiCel + "&deg;C / " + loCel + "&deg;C" + "<br> Wind Speed: " + windSp + "km/h" + "<br> Humidity: " + humid + "%" + "<br> Barometric Pressure: " + baro + " atm";
}


//Header Bar
if (chosenLocation == "current") {
    document.getElementById("headerBarTitle").textContent = 'Current Location';
} else {
    if (chosenLocation !== null) {
        document.getElementById("headerBarTitle").textContent = loc;
    } else {
        var locationNames = ["Location A", "Location B"];
        // If a location name was specified, use it for header bar title.
        document.getElementById("headerBarTitle").textContent = locationNames[locationIndex];
    }
}
//The date that dispalyedd weather applies to
// Returns a date in the format "YYYY-MM-DD".

Date.prototype.simpleDateString = function () {
    function pad(value) {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" +
        pad(this.getMonth() + 1, 2) + '-' +
        pad(this.getDate(), 2);

    return dateString;
}


//map displays on the page
var map;

function locMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {
            lat: latitude,
            lng: longitude
        }
    });


    var geocoder = new google.maps.Geocoder();
    fieldValueChanged = function () {
        geocoderAddress(geocoder, map);
    };

    var marker = new google.maps.Marker({
        position: {
            lat: latitude,
            lng: longitude
        },
        map: map,
        title: loc
    });
}

// Slider calls the getWeatherAtIndexForDate function, with a different callback function to display results on this page.


//A date selection slider
//30 positions
//set to the far right
var slide = document.getElementById('slide');
var forecastDate;

function slideChange() {
    //Each position means - 24 hours
    var slideDate = new Date();
    slideDate.setDate(slideDate.getDate() - (-1 * slide.value));

    //Get weather for location at new date
    //chosenLocationObj = locationWeatherCache.getWeatherAtIndexForDate();

    locDate.innerHTML = slideDate.simpleDateString();
    forecastDate = slideDate.forecastDateString();
    locationWeatherCache.getWeatherAtIndexForDate(index, forecastDate, viewPageWeatherResponse);
}