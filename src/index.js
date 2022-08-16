let timezone;
let timezoneMinutes;
let cTemperature;
let apiKey = "07804847d3eee0d453b79a2c32f2067e";
let units = "metric";


//set hour and day
function cityDate(timezone, timezoneMinutes) {
  let date = new Date();
  date.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  date.setHours(date.getUTCHours() + timezone);
  date.setMinutes(date.getUTCMinutes() +timezoneMinutes);
  let hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  let hour = hours[date.getHours()];
  let minutes = (date.getMinutes());
  minutes < 10 ? minutes = `0${minutes}`: minutes = minutes;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
  let day = days[date.getDay()];
  let amPm= "am";
  hour[0-11] < 10 ? amPm = "am":  amPm = "pm";
  document.querySelector("#date").innerHTML = `${day} | ${hour}:${minutes} ${amPm}`;
}

//search engine
function errorMessage() {
  alert(`We could't find ${document.querySelector("#text-input").value}, try another city.`);
} 

//Searched city weather data
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input").value;
  defaultInfo(city);
}

function defaultInfo(city) {
  let units = "metric";
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
  axios.get(apiUrl).then(showWeather).catch(errorMessage);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  cTemperature= Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = cTemperature;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  timezone = response.data.timezone/3600;
  timezoneMinutes = (response.data.timezone%3600)/60; 
  console.log(response.data);

  let mainIcon = document.querySelector("#mainIcon");
  mainIcon.src = `src/weatherIcons/${response.data.weather[0].icon}.svg`;

  getForecast(response.data.coord);
}

//Current weather data
function sendPostion() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
  
function showCurrentWeather(response) {
  cTemperature= Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = cTemperature;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  timezone = response.data.timezone/3600;
  timezoneMinutes = (response.data.timezone%3600)/60; 

  let mainIcon = document.querySelector("#mainIcon");
  mainIcon.src = `src/weatherIcons/${response.data.weather[0].icon}.svg`;
  getForecast(response.data.coord);
  let searchBar = document.querySelector("#text-input");
  searchBar.value = "";
}
  
//Initial weather info
defaultInfo("Guadalajara");

//Get weather on current location
let htmlCurrent = document.querySelector("#current-location");
htmlCurrent.addEventListener("click", sendPostion);

//Get weather from a searched city
let htmlSearchIcon = document.querySelector("#search-icon")
htmlSearchIcon.addEventListener("click", search);


let htmlForm = document.querySelector(".form-container");
htmlForm.addEventListener("submit", search);

setInterval(function()
{cityDate(timezone, timezoneMinutes);
}, 1000);

function convertF(event) {
  event.preventDefault();
  let htmlFTemp = document.querySelector("#temperature");
  htmlCelcius.classList.remove("active")
  htmlFahrenheit.classList.add("active");

  let fTemperature = Math.round((cTemperature * 9)/ 5 + 32);
  htmlFTemp.innerHTML = fTemperature;
}

function convertC(event) {
  event.preventDefault();
  let htmlFTemp = document.querySelector("#temperature");
  htmlFahrenheit.classList.remove("active");
  htmlCelcius.classList.add("active")

  htmlFTemp.innerHTML = cTemperature;
}

let htmlCelcius = document.querySelector(".celcius");
let htmlFahrenheit = document.querySelector(".farenheit");

htmlCelcius.addEventListener("click", convertC);
htmlFahrenheit.addEventListener("click", convertF);

// forecast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,current,minutely&appid=${apiKey}&units=${units}`
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}


function displayForecast(response) {
  console.log(response);

  let dailyForecast = response.data.daily;
  console.log(dailyForecast);
  
  let tempForecast = document.getElementsByClassName("daily-temp");
  let iconForecast = document.getElementsByClassName("forecast-icon");
  let dayForecast =  document.getElementsByClassName("week-day");

  let avDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 1; i <= 5; i++) {
    date = new Date(dailyForecast[i].dt*1000);
    dayForecast[i-1].innerHTML = avDays[date.getDay()];
    tempForecast[i-1].innerHTML = `${Math.round(dailyForecast[i].temp.min)}°- ${Math.round(dailyForecast[i].temp.max)}°`;
    iconForecast[i-1].src = `src/weatherIcons/${response.data.daily[i].weather[0].icon}.svg`;
    iconForecast[i-1].alt = response.data.daily[i].weather[0].description;
}
}
