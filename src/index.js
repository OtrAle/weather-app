let date = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];
let day = days[date.getDay()];
let htmlDay = document.querySelector("#day");
htmlDay.innerHTML = day;

let minutes = date.getMinutes();
let htmlMinutes = document.querySelector("#minutes");
minutes < 10 ? htmlMinutes.innerHTML = `0${minutes}` : htmlMinutes.innerHTML = minutes;

let hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
let hour = hours[date.getHours()]
let htmlHour = document.querySelector("#hour");
htmlHour.innerHTML = hour; 

let hmtmAmPm = document.querySelector("#am-pm");
hour[0-11] ? hmtmAmPm.innerHTML = "am" : hmtmAmPm.innerHTML = "pm"; 



//search engine
function errorMessage() {
    alert(`We could find ${document.querySelector("#text-input").value}, try another city.`);
  } 
  
  function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  }
  
  function defaultInfo(city) {
    let units = "metric";
    let apiKey = "07804847d3eee0d453b79a2c32f2067e";
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    axios.get(apiUrl).then(showWeather);
  }
  
  function search(event) {
    event.preventDefault();
    let city = document.querySelector("#text-input").value;
    defaultInfo(city);
  }
  
  //Current weather data
  function showCurrentWeather(response) {
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp); 
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  }
  
  function getPosition(position) {
    let apiKey = "07804847d3eee0d453b79a2c32f2067e";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showCurrentWeather);
  }
  
  function sendPostion() {
    navigator.geolocation.getCurrentPosition(getPosition);
  }
  
  let htmlForm = document.querySelector(".form-container");
  htmlForm.addEventListener("submit", search);
  
  defaultInfo("Guadalajara");
  
  let htmlCurrent = document.querySelector("#current-location");
  htmlCurrent.addEventListener("click", sendPostion);
  
  let htmlSearchIcon = document.querySelector("#search-icon")
  htmlSearchIcon.addEventListener("click", search);