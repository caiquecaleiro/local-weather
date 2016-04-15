$(document).ready(function() {
  getLocation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getLocalWeatherData(lat, lon);
      });
    }
  }

  function getLocalWeatherData(lat, lon) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric';
    $.getJSON(url, function(data) {
      $('#location').text(data.name);
      $('#temperature').text(data.main.temp);
      $('#sky').text(data.weather[0].description);
      $('#humidity').text(data.main.humidity + '%');
      console.log(data);
    });
  }
});
