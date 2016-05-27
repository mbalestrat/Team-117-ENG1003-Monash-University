// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.


function viewLocation(locationIndex) {
    //Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationWeatherCache.locationAtIndex[locationIndex]);
    //And load the view location page.
    location.href = 'viewlocation.html';
}

/*//global variables
var nickNameString = ""
var high = []
var low = []
var condition =[]

function nickNameStringUpdate(nickName) {
    for (i = 0, i < locations.length, i++) {
        nickNameString += nickName

    }

}



function conditionSummaryImage()*/