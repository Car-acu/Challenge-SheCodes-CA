function updateTime() {
  let now = new Date();
  let dateTime = document.querySelector("#current-time");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  dateTime.innerHTML = `${day} ${hour}:${minute}`;
}

updateTime();
setInterval(updateTime, 1000);

function updateCityWeather(response) {
  let temperature = document.querySelector("#current-temp");
  let currentTemp = response.data.temperature.current;
  let city = document.querySelector("#main-city");
  let conditions = document.querySelector("#current-conditions");
  let humidity = document.querySelector("#current-humidity");
  let windSpeed = document.querySelector("#current-wind");

  city.textContent = response.data.city;
  conditions.textContent = response.data.condition.description;
  humidity.textContent = `${response.data.temperature.humidity}%`;
  windSpeed.textContent = `${Math.round(response.data.wind.speed)}km/h`;
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
