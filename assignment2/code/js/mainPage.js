// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

//function viewLocation(locationName)
{
    // Save the desired location to local storage
    //localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    //location.href = 'viewlocation.html';
}

function viewlocation(locationName)
{
    //code to save location object to Local Storage
    outputAreaRef.innerHTML = JSON.stringify(locations);
    localStorage.setItem(APP_PREFIX,JSON.stringify(locations));
    //oad the view location page
    location.href = 'viewlocation.html'
}










