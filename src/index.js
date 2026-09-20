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

  getForecast(response.data.city);
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

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "t40o1483d2c1bd8dfe8cac9a5fcf64e1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="forecast-day">
            <div class="forecast-date">${formatForecastDate(day.time)}</div>
            <div>
            <img src="${day.condition.icon_url}" class="forecast-icon"/>
            </div>
            <div class="forecast-temp-range">
              <div class="forecast-temps forecast-min-temp">${Math.round(day.temperature.minimum)}°</div>
              <div class="forecast-temps forecast-max-temp">${Math.round(day.temperature.maximum)}°</div>
            </div>
          </div>
          `;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitCitySearch);

searchCity("Melbourne");

setInterval(() => {
  let time = document.querySelector("#current-time");

  time.textContent = updateTime(new Date());
}, 1000);
