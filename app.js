var loader;

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.05);
        }, 1000);
    }
}

function displayContent() {
    loader.style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    loader = document.getElementById('loader');
    loadNow(1);
});


const key = "8735b01840608035506e93d1c68962b7";

const search = document.querySelector(".search");
search.addEventListener("keypress", set);

function set(event) {
  if (event.keyCode == 13) {
    get(search.value);
  }
}

function get(location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${key}`
  )

    .then((weather) => {
      return weather.json();
    })
    .then(display);
}

function display(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateformat(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weatherevent = document.querySelector(".current .weather");
  weatherevent.innerText = weather.weather[0].description;

  let iconid = document.querySelector(".weather-icon");
  let iconcode = weather.weather[0].icon;
  iconid.innerHTML = `<img src="icons/${iconcode}.png" alt=" ">`;
}

function dateformat(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}