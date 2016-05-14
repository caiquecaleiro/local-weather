$(document).ready(function() {
  var celTemp = 0;
  var fahTemp = 32;
  var celSymbol = '°C';
  var fahSymbol = '°F';

  $('#celsius').click({scale: 'C'}, changeScale);
  $('#fahrenheit').click({scale: 'F'}, changeScale);

  getLocation();

  /**
   * Requests the user's position (coordinates). The coordinates are used to
   * execute the function getLocalWeatherData.
   */
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getLocalWeatherData(lat, lon);
      });
    }
  }

  /**
   * Uses the API OpenWeatherMap to get the weather data and set the values for
   * the HTML elements. The default scale will be Celsius.
   *
   * @param {number} lat - The latitude coordinate.
   * @param {number} lon - The longitude coordinate.
   */
  function getLocalWeatherData(lat, lon) {
    var coordinates = lat + '&lon=' + lon;
    var units = '&units=metric';
    var apiKey = '&APPID=0e6bfb61dab954b920834902e14fa852';
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates + units + apiKey;
    $.getJSON(url, function(data) {
      setTemperature(data.main.temp);
      setSelectedScale('C');
      $('#location').text(data.name);
      $('#celsius').text(celSymbol);
      $('#fahrenheit').text(fahSymbol);
      $('#sky').text(data.weather[0].description);
      $('#humidity').text('Humidity: ' + data.main.humidity + '%');
      setBackgroundImage(data.weather[0].icon);
    });
  }

  /**
   * Changes the temperature scale (Celsius or Fahrenheit).
   *
   * @param {object} event - The scale property. It can be 'C' to celsius or
   * 'F' to fahrenheit.
   */
  function changeScale(event) {
    setSelectedScale(event.data.scale);
  }

  /**
   * Sets the temperature scale (Celsius or Fahrenheit) and add 0.6 of opacity
   * style for the unselected scale.
   *
   * @param {string} scale - The scale property. It can be 'C' to celsius or
   * 'F' to fahrenheit.
   */
  function setSelectedScale(scale) {
    if (scale === 'C') {
      $('#temperature').text(celTemp);
      $('#fahrenheit').css('opacity', '0.6');
      $('#celsius').css('opacity', '1.0');
    } else if (scale === 'F') {
      $('#temperature').text(fahTemp);
      $('#celsius').css('opacity', '0.6');
      $('#fahrenheit').css('opacity', '1.0');
    }
  }

  /**
   * Sets the celsius temperature and converts it into fahrenheit scale as well.
   *
   * @param {number} celsius - The temperature value in celsius scale.
   */
  function setTemperature(celsius) {
    celTemp = celsius;
    fahTemp = convertCelToFah(celsius);
  }

  function convertCelToFah(celsius) {
    return Math.round((celsius * 9)/5 + 32);
  }

  /**
  * Sets the background image based on the weather status.
  * @param {string} weatherCode - The icon code from the Weather API.
  */
  function setBackgroundImage(weatherCode) {
    switch (weatherCode) {
      case '01d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/clear-sky-day.jpg' + ')');
        break;
      case '01n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/clear-sky-night.jpg' + ')');
        break;
      case '02d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/clear-sky-day.jpg' + ')');
        break;
      case '02n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/clear-sky-night.jpg' + ')');
        break;
      case '03d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/805e491bf3d225385b6c1d10033b75ff3f295151/img/scattered-clouds-day.jpg' + ')');
        break;
      case '03n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/scattered-clouds-night.jpg' + ')');
        break;
      case '04d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/805e491bf3d225385b6c1d10033b75ff3f295151/img/scattered-clouds-day.jpg' + ')');
        break;
      case '04n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/broken-clouds-night.jpg' + ')');
        break;
      case '09d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/rainy-day.jpeg' + ')');
        break;
      case '09n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/rainy-night.jpg' + ')');
        break;
      case '10d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/rainy-day.jpeg' + ')');
        break;
      case '10n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/rainy-night.jpg' + ')');
        break;
      case '11d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/thunderstorm-day.jpg' + ')');
        break;
      case '11n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/thunderstorm-night.jpg' + ')');
        break;
      case '13d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/snow-day.jpg' + ')');
        break;
      case '13n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/snow-night.jpg' + ')');
        break;
      case '50d':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/misty-day.jpg' + ')');
        break;
      case '50n':
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/812e35356cbe85331a339e1e08ed3ad6cd0f8770/img/misty-night.jpg' + ')');
        break;
      default:
        $('body').css('background-image', 'url(' + 'https://raw.githubusercontent.com/caiquecaleiro/local-weather/master/img/cloudy-day.jpg' + ')');
        break;
    }
  }

});
