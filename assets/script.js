// const weatherApiUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=fc0cfae3b133613dbc3178be6b4c1a4d"
// const weatherApiUrl = "https://goweather.herokuapp.com/weather/{city}"
const todayIs = Date

// Change the url to the 5day forcast option - delete my API key and make the a separate variable
// const weatherURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}"
// const apiKey = &appid=fc0cfae3b133613dbc3178be6b4c1a4d
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=fc0cfae3b133613dbc3178be6b4c1a4d"
async function getWeatherForecast(city) {
    // change the const data = await response.fetch(weatherURL + city + apiKey);
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    console.log(data);
    // even though I set the API to imperial measurement, the temp is coming in the document as Kelvin. I added the conversions for F and C
    const tempFC = Math.round(data.main.temp *((9/5)) - 459.67)+"°F/" +Math.round(data.main.temp -273.15).toFixed(0)+"°C"
    
    document.querySelector("#city").textContent = data.name
    document.querySelector("#temp").textContent = tempFC
    document.querySelector("#humidity").textContent = "Humidity is " + data.main.humidity 
    document.querySelector("#windSpeed").textContent = "Wind Speed  is "+ data.wind.speed + " mph"
    document.querySelector("#weatherConditionIcon").textContent = data.weather[0].main

}
getWeatherForecast();
// refresh every 10 minutes based on weather documentation saying it refreshes weather information every 10 minutes
// setInterval(getWeatherForecast,600000)
{/* <div id="city"></div>
        <div id="temp">°</div>
        <div id="humidity"></div>
        <div id="windSpeed"></div>
        <div id="weatherConditionIcon"></div> */}