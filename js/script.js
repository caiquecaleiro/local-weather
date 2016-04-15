$(document).ready(function() {
  getLocalWeatherData();

  function getLocalWeatherData() {
    // Add a location API later
    var lat = 57.5359;
    var lon = 6.2263;
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric';
    $.getJSON(url, function(data) {
      $('#location').text(data.name);
      $('#temperature').text(data.main.temp);
      $('#sky').text(data.weather[0].description);
      $('#humidity').text(data.main.humidity);
      console.log(data);
    });
  }
});
