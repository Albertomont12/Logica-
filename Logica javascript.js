const API_KEY = 'TU_API_KEY_DE_OPENWEATHER'; // Consigue una gratis en openweathermap.org
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://openweathermap.org{city}&units=metric&appid=${API_KEY}&lang=es`
        );
        
        if (!response.ok) throw new Error('Ciudad no encontrada');
        
        const data = await response.json();
        updateUI(data);
    } catch (err) {
        alert(err.message);
    }
}

function updateUI(data) {
    document.getElementById('weatherDisplay').classList.remove('hidden');
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
}

searchBtn.addEventListener('click', () => {
    if (cityInput.value) getWeatherData(cityInput.value);
});

// Permitir buscar al presionar "Enter"
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeatherData(cityInput.value);
});