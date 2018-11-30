var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.739,
            lng: -104.990
        },
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(pos)

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            infoWindow.open(map);
            map.setCenter(pos);
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: pos,
                radius: 5000,
                type: ['restaurant']

            }, callback);
       
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
    });
    console.log(place.name);
    console.log(place.vicinity);
    console.log(place.opening_hours.open_now);
    console.log(place.rating);
    console.log(marker.position);
    setInfoWindow(marker, place.name, place.vicinity)
}

function setInfoWindow(mark, name, vicinity, rating) {
    google.maps.event.addListener(mark, 'click', function(event) {
        var iwindow = new google.maps.InfoWindow();
        iwindow.setContent('<div id="info-bubble" style="padding:20px;border-radius:5px;max-width:260px;box-shadow:none;"><a href="" style="display:block;"><img src="" style="display:block;margin-bottom:10px;max-width:100%;"></a><h4>Name: ' + name +'<hr>Address: '+ vicinity +'<hr>Rating(1-5): '+ rating +'</h4></div>');
        iwindow.open(map, this);
    });
}//<hr>Open?: '+ opening_hours.open_now +