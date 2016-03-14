(function () {
    "use strict";
    var map,

        initMap = function () {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 18
            });
        },
    
        main = function () {
            initMap();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(pos);
                });
            }
        };
    
    $(document).ready(function () {
        main();
    });
}());