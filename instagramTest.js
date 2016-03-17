(function () {
    "use strict";
    var Instagram = function (lat,lng) {
        var access_token = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: "https://api.instagram.com/v1/locations/search?lat="+lat+"&lng="+lng+"&access_token="+access_token,
            success: function (data) {
                console.log(data);
            }
        });

    };
}());
