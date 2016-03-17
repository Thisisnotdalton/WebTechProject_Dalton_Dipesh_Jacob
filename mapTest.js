(function () {
    "use strict";
    var map,

        initMap = function () {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 18
            });
        },
        Instagram = function (lat, lng) {
            var access_token = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587",                   locationIds=[];
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: "https://api.instagram.com/v1/locations/search?lat=" + lat + "&lng=" + lng + "&access_token=" + access_token,
                success: function (data) {
                    for(var obj in data.data){
                        locationIds.push(data.data[obj]);
                    }
                    for(var loc in locationIds){
                        console.log("Checking location id:"+locationIds[loc].id+"\tname:"+locationIds[loc].name);
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            cache: false,
                            url: "https://api.instagram.com/v1/locations/"+locationIds[loc].id+"/media/recent?access_token="+access_token,
                            success: function (data) {
                                console.log(data);
                            }
                        });
                    }
                    //console.log(locationIds);
                }
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
                    Instagram(pos.lat,pos.lng);
                });
            }
        };
    
    $(document).ready(function () {
        main();
    });
}());
