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