/*===============================================================================================================
TEAM 117
Assignment 2, ENG1003
Last Edited: 24/05/2016
Written by Michelle Balestrat, 23838213
===============================================================================================================*/

// Code for the Add Location page.
// Position global variable
var pos;

// Geocoder
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.8688,
            lng: 151.2195
        },
        zoom: 13,
        disableDefaultUI: true
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });

        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            pos = place.geometry.location;
            name = place.name;

            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));


            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        map.fitBounds(bounds);
    });
    //return markers.pop();
}

nick = document.getElementById("nickname");
locationVal = document.getElementById("pac-input");

// Saves the position when you click the button.
function savePosition() {
    nickname = nick.value;
    if (nickname == '') {
        locationWeatherCache.addLocation(pos.lat(), pos.lng(), name);
    } else {
        locationWeatherCache.addLocation(pos.lat(), pos.lng(), nickname);
    }
    loc = locationVal.value;
    if (locationVal == '' || locationVal == null) {
        //Throw error
    } else {
        //Proceed
        location.href = 'index.html';
    }
}

// Script for popup error state feedback
(function () {
    'use strict';
    var snackbarContainer = document.querySelector('#confirmation');
    var showToastButton_Fail = document.querySelector('#submitGPS');
    var showToastButtonForManual_Fail = document.querySelector('#submit');

    showToastButton_Fail.addEventListener('click', function () {
        'use strict';
        var data = {
            message: 'Please enter a name for the current location.'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });

    showToastButtonForManual_Fail.addEventListener('click', function () {
        'use strict';
        var data = {
            message: 'Error: Please enter a location!'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });

}());

// ===========================================================================================================
// GPS Functionality
// ===========================================================================================================

//Watch GPS location
var currentLat;
var currentLng;

navigator.geolocation.getCurrentPosition(
    function (location) {
        currentLat = location.coords.latitude;
        currentLng = location.coords.longitude;
        console.log(location.coords.accuracy);
    });

//Add GPS location
function addCurrentLocation() {
    nickname = nick.value;
    if (nickname == '') {
        //Force user to add nickname for current location.
    } else {
        locationWeatherCache.addLocation(currentLat, currentLng, nickname);
        location.href = 'index.html';
    }
}