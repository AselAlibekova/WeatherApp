console.log("here");

function updateDateTime() {
  const currentDateTime = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[currentDateTime.getDay()];
  const currentDate = currentDateTime.toDateString();

  document.getElementById("currentDay").textContent = currentDay;
  document.getElementById("currentDate").textContent = currentDate;
}

document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('usdRate').textContent = `USD Rate: ${data.rates.USD}`;
            document.getElementById('eurRate').textContent = `EUR Rate: ${data.rates.EUR}`;
            document.getElementById('kztRate').textContent = `KZT Rate: ${data.rates.KZT}`;
            document.getElementById('rubRate').textContent = `RUB Rate: ${data.rates.RUB}`;
        })
        .catch(error => {
            console.error('Error fetching currency data:', error);
        });
});


window.setTimeout(() => {
    var mymap = L.map('mapid').setView([0, 0], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

    
    let val = "";
    document.querySelector("#input").addEventListener("input", (event) => {
        val = event.target.value;
    });

    document.querySelector("button").addEventListener("click", (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/weatherCity?city=" + val, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const lat = data.data.city.coord.lat;
            const lon = data.data.city.coord.lon;
            updateWeatherInfo(data.data);
            updateMap(lat, lon);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function updateWeatherInfo(weatherData) {
        document.querySelector('.weather__img').src = "http://openweathermap.org/img/w/" + weatherData.list[0].weather[0].icon + ".png";
        document.querySelector('.weather__temp').textContent = `${convertKelvinToCelsius(weatherData.list[0].main.temp).toFixed(2)}°C`;
        document.querySelector('.weather__city').textContent = weatherData.city.name;
        document.getElementById('humidity').textContent = `${weatherData.list[0].main.humidity}%`;
        document.getElementById('speed').textContent = `${weatherData.list[0].wind.speed} km/h`;
        document.getElementById('feels-like').textContent = `${convertKelvinToCelsius(weatherData.list[0].main.feels_like).toFixed(2)}°C`;
        document.getElementById('pressure').textContent = `${weatherData.list[0].main.pressure} hPa`;
        document.getElementById('coordinates').textContent = `Lat: ${weatherData.city.coord.lat}, Lon: ${weatherData.city.coord.lon}`;
        document.getElementById('country').textContent = weatherData.city.country;
    }

    function updateMap(lat, lon) {
        mymap.setView([lat, lon], 10);
    }
    
    function convertKelvinToCelsius(kelvin) {
        return kelvin - 273.15;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

}, 1000);
