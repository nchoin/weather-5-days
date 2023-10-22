// const weatherApiUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={fc0cfae3b133613dbc3178be6b4c1a4d}"
const weatherApiUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={https://api.weather.gov/points/{latitude},{longitude}}"

async function getWeatherForecast() {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    console.log(data);
    
}
getWeatherForecast();

