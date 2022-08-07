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
  return `${day} | ${hour}:${minutes} ${amPm}`;
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
    let apiKey = "07804847d3eee0d453b79a2c32f2067e";
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    axios.get(apiUrl).then(showWeather);
  }

  function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    let timezone = response.data.timezone/3600;
    let timezoneMinutes = (response.data.timezone%3600)/60; 
    document.querySelector("#date").innerHTML = cityDate(timezone,timezoneMinutes);
    console.log(response.data);
  }

  //Current weather data
  function sendPostion() {
    navigator.geolocation.getCurrentPosition(getPosition);
  }

  function getPosition(position) {
    let apiKey = "07804847d3eee0d453b79a2c32f2067e";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showCurrentWeather);
  }
  
  function showCurrentWeather(response) {
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp); 
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    let timezone = response.data.timezone/3600;
    document.querySelector("#date").innerHTML = cityDate(timezone);
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