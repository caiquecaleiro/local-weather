$(document).ready(function() {
  var metricUnit = true;
  var celTemp = 0;
  var fahTemp = 32;
  var celSymbol = '°C';
  var fahSymbol = '°F';

  $('#temperature').click(changeUnit);
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
      setTemperature(data.main.temp);
      $('#location').text(data.name);
      $('#temperature').text(celTemp + celSymbol);
      $('#sky').text(data.weather[0].description);
      $('#humidity').text('Humidity: ' + data.main.humidity + '%');
    });
  }

  function changeUnit() {
    if (metricUnit) {
      $('#temperature').text(fahTemp + fahSymbol);
      metricUnit = false;
    } else {
      $('#temperature').text(celTemp + celSymbol);
      metricUnit = true;
    }
  }

  function setTemperature(celsius) {
    celTemp = celsius;
    fahTemp = convertCelToFah(celsius);
  }

  function convertCelToFah(celsius) {
    return Math.round((celsius * 9)/5 + 32);
  }

});
