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
            var access_token = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587",
                locationIds = [],
                photoData = [];
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: "https://api.instagram.com/v1/locations/search?lat=" + lat + "&lng=" + lng + "&access_token=" + access_token,
                success: function (data) {
                    for (var obj in data.data) {
                        locationIds.push(data.data[obj]);
                    }
                    for (var loc in locationIds) {
                        //console.log("Checking location id:"+locationIds[loc].id+"\tname:"+locationIds[loc].name);
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            cache: false,
                            url: "https://api.instagram.com/v1/locations/"+locationIds[loc].id+"/media/recent?access_token="+access_token,
                            success: function (data) {
                                //console.log(data);
                                for (var obj in data) {
                                    if (Array.isArray(data[obj])) {
                                        for (var k in data[obj]) {
                                            photoData.push(data[obj][k]);
                                        }
                                    }
                                }
                            }
                        });
                    }
                    console.log(photoData);
                    //console.log(locationIds);
                    console.log(photoData[1]);
                    /*for (var i in photoData) {
                        var marker = new google.maps.Marker({
                            position: {
                                lat: photoData[i].location.latitude,
                                lng: photoData[i].location.longitude
                            },
                            map: map,
                            icon: photoData[i].images.thumbnail.url
                        });
                    }*/
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
                    Instagram(pos.lat, pos.lng);
                });
            }
        };
    
    $(document).ready(function () {
        main();
    });
}());
