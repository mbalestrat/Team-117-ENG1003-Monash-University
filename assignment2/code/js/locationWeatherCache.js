
// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    
    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}


// Code for LocationWeatherCache class and other shared code.
// Global variable to count the number of removed items and offset the index of locations array.
var spliceCount;
var LocationWeatherCache;

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
        return locations[index]; 
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    
    
    this.addLocation = function(latitude, longitude, nickname, date)
    {
        // Create the newLoc object
        var newLoc = 
            {
             nick: nickname, 
             lat: latitude, 
             long: longitude
             forecasts: {}
            };
    
            newLoc.forecasts[""] = 
        
        // Push the new location to the array
        locations.push(newLoc);
        index = locations.length - (spliceCount + 1);
        
        // Save to cache
        localStorage.setItem(APP_PREFIX + index, JSON.stringify(newLoc));
        
        // Return index of added location
        return index;
    };

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        localStorage.removeItem(APP_PREFIX + index);
        locations.splice(index, 1);
        spliceCount++;
    };

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() 
    {
        var locationWeatherPDO = {
			locations: locations,
			callbacks: callbacks
		};
		return locationWeatherPDO;
    };
    
    //Sets private attributes for a class instance. Lets LocalWeather be recreated on app relaunch.
    this.initialiseFromJSON = function()
    {
        
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) 
    {
    
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(index, date, callback) 
    {
        
        //Check if weather data point for date is already in forecasts array. (Use a search method)
        
            // If yes, call callback function with weather data.
        
            // If not, call forecast API with JSONP
            // Store in forecasts array and return to callback function.
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
function getIndexByLatLng(lat,lng){
    for(var i=0;i<locations.length;i++){
        if(locations[i].lat===lat && locations[i].lng===lng){
            return(i);
        }
    }
    return(-1);
}
    this.weatherResponse = function(response) 
    {
        var index=getIndexByLatLng(response.lat,response.lng);
        locations[index]
        
        
        saveLocations(locations);
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
    // Create a single LocationWeatherCache class instance inside global variable 'LocationWeatherCache'.
    
    LocationWeatherCache = new LocationWeatherCache();
    
    // Check local storage for existing cache object

}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations(locs)
{
    localStorage.setItem(APP_PREFIX,locs);
}

// Call loadLocations function so that stored data is available on all pages.

loadLocations();

