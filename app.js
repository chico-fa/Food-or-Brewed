// Get the users position and display it on the page

function getUserLocation() {
    if (navigator.geolocation) {
        var options = {
            timeout: 6000
        };
        navigator.geolocation.getCurrentPosition(success, fail, options);
        output.innerHTML = "Checking your location...";
    } else {
        alert("Sorry, your browser doesn't support geolocation");
    }
}

var output = document.getElementById("output-container");
var msg = "Sorry, we're unable to get your location";

function success(position) {

    // Display the longitude and latitude on the page (for testing purposes)
    msg = "<p>Latitude: ";
    msg += position.coords.latitude + "<br>";
    msg += "Longitude: ";
    msg += position.coords.longitude + "</p>";
    // output.innerHTML = msg;
    
    // Set variable containing users latitude and longitude
    var latlng = position.coords.latitude + "," + position.coords.longitude;

    // https://developers.google.com/places/web-service/search
    
    // findplacefromtext search
    // https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurants&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@39.5591216,-104.9352344&key=AIzaSyC77GV8o8FcyX9F_gZyxVsn9OvNVkCYZ-w
    // var foodSearch = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurants&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@" + latlng + "&key=AIzaSyC77GV8o8FcyX9F_gZyxVsn9OvNVkCYZ-w";
    
    // nearby search
    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=""&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyC77GV8o8FcyX9F_gZyxVsn9OvNVkCYZ-w
    var foodSearch = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latlng + "&radius=2000&type=restaurant&key=AIzaSyC77GV8o8FcyX9F_gZyxVsn9OvNVkCYZ-w";
    var brewedSearch = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latlng + "&radius=2000&type=bar&key=AIzaSyC77GV8o8FcyX9F_gZyxVsn9OvNVkCYZ-w";
    console.log(foodSearch);
    
    output.innerHTML = msg + "<a href=" + foodSearch + " target=\"_blank\">Food</a>" + "<br>" + "<a href=" + brewedSearch + " target=\"_blank\">Brewed</a>";
}

function fail(msg) {
    output.textContent = msg;
    console.log(msg.code);
}

getUserLocation();

// function showPosition(position) {
//     console.log("Latitude: " + position.coords.latitude + "\n" + "Longitude: " + position.coords.longitude);
// }

// Display current position using static map
// https://developers.google.com/maps/documentation/maps-static/introquiver
// function showPosition(position) {
//     var latlon = position.coords.latitude + "," + position.coords.longitude;

//     var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon +
//         "&zoom=14&size=600x600&sensor=false&key=AIzaSyC77GV8o8FcyX9F_gZyxVsn9OvNVkCYZ-w";

//     document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";
// }

// getUserLocation();