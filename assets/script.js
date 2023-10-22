// const weatherApiUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=fc0cfae3b133613dbc3178be6b4c1a4d"

// added the jquery link so I can add the date. .
const date = dayjs().format('dddd, MMMM D, YYYY');
document.getElementById('currentDay').textContent = date;

// Change the url to the 5day forcast option - delete my API key and make the a separate variable
// const weatherURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}"
const apiKey = "&appid=fc0cfae3b133613dbc3178be6b4c1a4d"
//const fiveDayWeatherURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}"

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="

//create variables to get the city from the input field
const cityName = document.getElementById("cityToSearch");
document.getElementById("btnSearchForThisCity").addEventListener('click', function(){
    window.localStorage.setItem('aCity',cityName.value);
});
let recentCity = localStorage.getItem('aCity');

// let showLastCity = document.getElementById('showLastCity');
// showLastCity.value = recentCity;


async function getWeatherForecast() {
    const response = await fetch(weatherApiUrl + recentCity + apiKey);
    // const response = await fetch(weatherApiUrl);
    const data = await response.json();
    console.log(data);
    // even though I set the API to imperial measurement, the temp is coming in the document as Kelvin. I added the conversions for F and C
    const tempFC = Math.round(data.main.temp *((9/5)) - 459.67)+"°F/" +Math.round(data.main.temp -273.15).toFixed(0)+"°C"
    
    document.querySelector("#city").textContent = data.name
    document.querySelector("#temp").textContent = tempFC
    document.querySelector("#humidity").textContent = "Humidity is " + data.main.humidity +"%"
    document.querySelector("#windSpeed").textContent = "Wind Speed  is "+ data.wind.speed + " mph"
    document.querySelector("#weatherConditionIcon").textContent = "Current Weather Conditions: " +data.weather[0].main

    // add the click function to the button to call the getWeatherForecast and add the city name to the query.
    
}
// getWeatherForecast();
// refresh every 10 minutes based on weather documentation saying it refreshes weather information every 10 minutes
// setInterval(getWeatherForecast,600000)

