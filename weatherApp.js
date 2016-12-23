
var latitude, longitude, city, country, temperature, weather, humidity, wind, clouds, citySearch, iconSelector, iconHolders, dizzle, storm, cloudy, snow, clear, rain;

var cityHolder = document.getElementById("city");
var countryHolder = document.getElementById("country");
var temperatureHolder = document.getElementById("temperature");
var weatherHolder = document.getElementById("weather");
var humidityHolder = document.getElementById("humidity");
var windHolder = document.getElementById("wind");
var cloudsHolder = document.getElementById("clouds");
var searchButton = document.getElementById("searchButton");
var locateBackButton = document.getElementById("locateBackButton");
var theForm = document.getElementById("theForm");
var dizzle = document.getElementById("dizzle");
var storm = document.getElementById("storm");
var cloudy = document.getElementById("cloudy");
var snow = document.getElementById("snow");
var clear = document.getElementById("clear");
var rain = document.getElementById("rainy");
var iconHolders = [dizzle, storm, cloudy, snow, clear, rain];

locationByIP();

function locationByIP() {
  var locationRequest = new XMLHttpRequest();
  locationRequest.onreadystatechange = function () {
    if (locationRequest.readyState === 4 && locationRequest.status === 200) {
    var locationObj = JSON.parse(locationRequest.responseText);
    var coordinates = locationObj.loc.split(",");
    latitude = coordinates[0];
    longitude = coordinates[1];
    city = locationObj.city;
    country = locationObj.country;

    getWeather();  // uses user's location and proceeds to fetch weather data
    }
  };
  locationRequest.open("GET", 'http://ipinfo.io/json', true);
  locationRequest.send();
}

function getWeather() {
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=285e072753cf31ddbeb04dfd941d01fd&units=metric";
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.onreadystatechange = function () {
    if (weatherRequest.readyState === 4 && weatherRequest.status === 200) {
      var obj = JSON.parse(weatherRequest.responseText);
      temperature = Math.round(obj.main.temp);
      weather = obj.weather[0].description;
      iconSelector = obj.weather[0].main;
      humidity = obj.main.humidity;
      wind = obj.wind.speed;
      clouds = obj.clouds.all;
      displayAll();  // updates the page with HTML
    }
  };
  weatherRequest.open("GET", url, true);
  weatherRequest.send();
}

function getWeatherByCity() {
  citySearch = document.getElementById("weatherSearchInput").value;
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=285e072753cf31ddbeb04dfd941d01fd&units=metric";
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.onreadystatechange = function () {
    if (weatherRequest.readyState === 4 && weatherRequest.status === 200) {
      var obj = JSON.parse(weatherRequest.responseText);
      city = obj.name;
      country = obj.sys.country;
      temperature = Math.round(obj.main.temp);
      weather = obj.weather[0].description;
      iconSelector = obj.weather[0].main;
      humidity = obj.main.humidity;
      wind = obj.wind.speed;
      clouds = obj.clouds.all;
      displayAll();  // updates the page with HTML
    }
  };
  weatherRequest.open("GET", url, true);
  weatherRequest.send();
}

theForm.addEventListener('submit', function(e) {
    e.preventDefault();
    getWeatherByCity();
});
searchButton.addEventListener("click", getWeatherByCity);
locateBackButton.addEventListener("click", locationByIP);


function displayAll() {
  cityHolder.innerHTML = city;
  countryHolder.innerHTML = country;
  temperatureHolder.innerHTML = temperature + " °C";
  weatherHolder.innerHTML = weather;
  humidityHolder.innerHTML = "Humidity " + humidity + "%";
  windHolder.innerHTML = "Wind Speed " + wind + " m/s";
  cloudsHolder.innerHTML ="Cloud Cover " + clouds + "%";
  iconHolders.forEach(function(el) {
    el.classList.add("hide");
  })
  switch (iconSelector) {
    case "Drizzle":
    dizzle.classList.remove("hide");
      break;
    case "Clouds":
    cloudy.classList.remove("hide");
      break;
    case "Rain":
    rain.classList.remove("hide");
      break;
    case "Snow":
    snow.classList.remove("hide");
      break;
    case "Clear":
    clear.classList.remove("hide");
      break;
    case "Thunderstorm":
    storm.classList.remove("hide");
      break;
    default:
  }
}
