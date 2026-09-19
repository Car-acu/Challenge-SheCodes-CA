function updateTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

function updateCityWeather(response) {
  let city = document.querySelector("#main-city");
  let time = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let conditions = document.querySelector("#current-conditions");
  let humidity = document.querySelector("#current-humidity");
  let windSpeed = document.querySelector("#current-wind");
  let icon = document.querySelector("#weather-icon");
  let temperature = document.querySelector("#current-temp");
  let currentTemp = response.data.temperature.current;

  city.textContent = response.data.city;
  time.textContent = updateTime(date);
  conditions.textContent = response.data.condition.description;
  humidity.textContent = `${response.data.temperature.humidity}%`;
  windSpeed.textContent = `${Math.round(response.data.wind.speed)} m/s`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-icon"/>`;
  temperature.textContent = Math.round(currentTemp);
}

function searchCity(city) {
  let apiKey = "t40o1483d2c1bd8dfe8cac9a5fcf64e1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateCityWeather);
}

function submitCitySearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");

  searchCity(searchInput.value);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitCitySearch);

searchCity("Melbourne");

setInterval(() => {
  let time = document.querySelector("#current-time");

  time.textContent = updateTime(new Date());
}, 1000);
