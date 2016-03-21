(function () {
    "use strict";
    var map,
        markers = [],
        MAX_MARKERS = 200,
        timeOutFun = null,
        zoomRatios = {
            20: 1128.497220,
            19 : 2256.994440,
            18 : 4513.988880,
            17 : 9027.977761,
            16 : 18055.955520,
            15 : 36111.911040,
            14 : 72223.822090,
            13 : 144447.644200,
            12 : 288895.288400,
            11 : 577790.576700,
            10 : 1155581.153000,
            9  : 2311162.307000,
            8  : 4622324.614000,
            7  : 9244649.227000,
            6  : 18489298.450000,
            5  : 36978596.910000,
            4  : 73957193.820000,
            3  : 147914387.600000,
            2  : 295828775.300000,
            1  : 591657550.500000,
        },
        initMap = function () {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 35.616741, lng: -82.567284},
                zoom: 18
            });

            google.maps.event.addListener(map,"center_changed", function(){
                    var pos = map.getCenter();
                    //make sure we don't call too many times
                    if(timeOutFun != null){
                        console.log("Canceling previous call until map settles.");
                        clearTimeout(timeOutFun);
                    }
                    timeOutFun = setTimeout(function(){
                        Instagram(pos.lat(), pos.lng(),map.getZoom());
                    },1000);
            });
        },
        Instagram = function (lat, lng, zoom) {
            var access_token = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587",
                locationIds = [],
                photoData = [];
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: "https://api.instagram.com/v1/locations/search?lat=" + lat + "&lng=" + lng + "&distance=" + zoomRatios[zoom] + "&access_token=" + access_token,
                success: function (data) {
                    console.log(data);
                    for (var obj in data.data) {
                        locationIds.push(data.data[obj]);
                    }
                    for (var loc in locationIds) {
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            cache: false,
                            url: "https://api.instagram.com/v1/locations/"+locationIds[loc].id+"/media/recent?access_token="+access_token,
                            success: function (data) {
                                for (var obj in data) {
                                    if (Array.isArray(data[obj])) {
                                        for (var k in data[obj]) {
                                            photoData.push(data[obj][k]);
                                        }
                                    }
                                }

                                for (var i in photoData) {
                                    var marker = new google.maps.Marker({
                                        position: {
                                            lat: photoData[i].location.latitude,
                                            lng: photoData[i].location.longitude
                                        },
                                        map: map,
                                        icon: {
                                            scaledSize: new google.maps.Size(50, 50),
                                            url: photoData[i].images.thumbnail.url
                                        }
                                    });
                                    //ensure we don't have too many markers
                                    markers.push(marker);
                                    if(markers.length>MAX_MARKERS){
                                         markers[0].setMap(null);                                                              markers.splice(0,1);
                                    }
                                }
                            }
                        });
                    }
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
                    Instagram(pos.lat, pos.lng,map.getZoom());
                });
            }
        };
    
    $(document).ready(function () {
        main();
    });
}());
