
const searchButton = document.getElementById('searchButton');
const weatherContainer = document.getElementById('weatherContainer');
const errorMessage = document.getElementById('errorMessage');
const timeDisplay = document.getElementById('time');
const queriesRemain = document.getElementById('queriesRemain');
let totalSeconds = 60;
let queriesCountLeft = 60;

const API_KEY = "d26117d8a42436aa64487cb2862b82fb";
async function SearchWeather() {
    try {
        errorMessage.hidden = true;
        const city = dropdownCitiesButton.innerText;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = response.data;
        console.log(data);
        const weather = data.weather[0].description;
        
        weatherContainer.hidden = false;
        
        document.getElementById('minTemp').innerText = data.main.temp_min + '°C';
       
        document.getElementById('maxTemp').innerText = data.main.temp_max + '°C';
        document.getElementById('weatherDescription').innerText = weather;
        document.getElementById('cityName').innerText = city;
        document.getElementById('windSpeed').innerText = data.wind.speed + ' m/s';
        document.getElementById('feelsLike').innerText = data.main.feels_like +'°C';

        if (weather.includes('clear sky')) {
            document.getElementById('weatherImage').src = '/images/clearSky.png';
        }
        else if (weather.includes('clouds')) {
            document.getElementById('weatherImage').src = '/images/brokenClouds.png';
        }
        else if (weather.includes('rain')) {
            document.getElementById('weatherImage').src = '/images/rain.png';
        }
        else if (weather.includes('sun')) {
            document.getElementById('weatherImage').src = '/images/sun.png';
        }
        else if (weather.includes('fog')) {
            document.getElementById('weatherImage').src = '/images/fog.png';
        }
        queriesCountLeft--;

    } catch (error) {
        console.error('Помилка при отриманні погоди:', error);
        errorMessage.hidden = false;
        queriesCountLeft--;
        weatherContainer.hidden = true;
    }
}

searchButton.addEventListener('click', SearchWeather);



function updateTimer() {

    if (totalSeconds == 60) {
        timeDisplay.textContent = `60:00`;

    }
    else if (totalSeconds < 10) {
        timeDisplay.textContent = `00:0${totalSeconds}`;
    }
    else
        timeDisplay.textContent = `00:${totalSeconds}`;

    totalSeconds--;
    queriesRemain.innerText = `${queriesCountLeft} / 60 queries left`;

    if (totalSeconds < 0) {
        totalSeconds = 60; 
        queriesCountLeft = 60;
    }
}

setInterval(updateTimer, 1000);