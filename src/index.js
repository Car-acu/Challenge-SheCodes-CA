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

function updateCityAndTemp(response) {
  let currentTemp = response.data.temperature.current;
  let displayedTemp = document.querySelector("#current-temp");
  let chosenCity = document.querySelector("#main-city");

  displayedTemp.textContent = Math.round(currentTemp);
  chosenCity.textContent = response.data.city;
}

function searchCity(city) {
  let apiKey = "t40o1483d2c1bd8dfe8cac9a5fcf64e1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateCityAndTemp);
}

function submitCitySearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");

  searchCity(searchInput.value);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitCitySearch);
