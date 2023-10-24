let citySearch = document.querySelector("#cityInput");
const searchButton=document.querySelector("#searchBtn");
const apiKey = "&appid=fc0cfae3b133613dbc3178be6b4c1a4d"

const getCityCoordinates= function () {
    let cityName = citySearch.value.trim();
    if(!cityName)return //end/returns because the cityName was empty
    const geoCodingApiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&limit=1&${apiKey}`

//using the api link with my ID and the city name will get the response in the a JSON (object)format. Need to get the lat, lon and name of city from the object returned. Will use this for the 5 day weather forecast. If there is nothing in the object run the catch function which is an alert.
    fetch(geoCodingApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
        if(!data.length)return alert(`No coordinatesfound for ${cityName}`);
        const {name, 'coord.lat', 'coord.lon'}=data[0];
        getWeatherDetails(name,)
    }).catch(function(){
        alert("An error occured while fetching the coordinates.");
    });
}







searchButton.addEventListener("click", getCityCoordinates);

// const weatherApiUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=fc0cfae3b133613dbc3178be6b4c1a4d"

// // added the jquery link so I can add the date. .
// const date = dayjs().format('dddd, MMMM D, YYYY');
// document.getElementById('currentDay').textContent = date;

// Change the url to the 5day forcast option - delete my API key and make the a separate variable
// const weatherURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}"
//const fiveDayWeatherURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}"

// const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="

// //create variables to get the city from the input field
// const cityName = document.getElementById("cityToSearch");
// document.getElementById("btnSearchForThisCity").addEventListener('click', function(){
//     window.localStorage.setItem('aCity',cityName.value);
// });
// let recentCity = localStorage.getItem('aCity');

// // let showLastCity = document.getElementById('showLastCity');
// // showLastCity.value = recentCity;


// async function getWeatherForecast() {
//     const response = await fetch(weatherApiUrl + recentCity + apiKey);
//     // const response = await fetch(weatherApiUrl);
//     const data = await response.json();
//     console.log(data);
//     // even though I set the API to imperial measurement, the temp is coming in the document as Kelvin. I added the conversions for F and C
//     const tempFC = Math.round(data.main.temp *((9/5)) - 459.67)+"°F/" +Math.round(data.main.temp -273.15).toFixed(0)+"°C"
    
//     document.querySelector("#city").textContent = data.name
//     document.querySelector("#temp").textContent = tempFC
//     document.querySelector("#humidity").textContent = "Humidity is " + data.main.humidity +"%"
//     document.querySelector("#windSpeed").textContent = "Wind Speed  is "+ data.wind.speed + " mph"
//     document.querySelector("#weatherConditionIcon").textContent = "Current Weather Conditions: " +data.weather[0].main

//     // add the click function to the button to call the getWeatherForecast and add the city name to the query.
    
// }
// getWeatherForecast();
// refresh every 10 minutes based on weather documentation saying it refreshes weather information every 10 minutes
// setInterval(getWeatherForecast,600000)

