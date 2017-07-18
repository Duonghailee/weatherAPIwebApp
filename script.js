/* credit to freecodeacamp API, thanks so much */

var lat, lon;
var APIurl = "https://fcc-weather-api.glitch.me/api/current?";

/*
get user location via geolocation service html5 */
$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat + ", " + lon);
            getWeather(lat, lon);
        });
    } else {
        alert("There is no navigator suppport in this browser");
    }

});

/*
function change betwwen F and C unit */
function change() {
    var current_unit = $("button").text(); // C or F
    var current_temp = parseInt($("#temp").text(), 10); //curent temperature in C or F

    var unit = current_unit == "C" ? "F" : "C"; //swap unit
    var temperature = current_unit == "C" ? Math.round(current_temp * 9 / 5 + 32) : Math.round((current_temp - 32) * 5 / 9); //swap unit value
    $("#temp").html("<h3>" + temperature + "<sup>o</sup><button style=\"background-color:Transparent ; outline:none ;\" onclick=\"change()\">" + unit + "</button></h3>");
}

/*
function get data from API url */
function getWeather(lat, lon) {
    $.getJSON(APIurl + "lat=" + lat + "&lon=" + lon, function(data) {
        var temperature = data.main.temp;
        $("#location").html("<h3> City: " + data.name + ", " + data.sys.country + "</h3>");
        $("#temp").html("<h3>" + temperature + "<sup>o</sup><button style=\"background-color:Transparent ; outline:none; \" onclick=\"change()\">" + "C" + "</button></h3>");
        $("#status").html("<h4>" + data.weather[0].description + "</h4>");
        $("#image").attr("src", data.weather[0].icon);
    });
}