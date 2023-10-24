let citySearch = document.querySelector("#cityInput");
const searchButton=document.querySelector("#searchBtn");
const apiKey = "fc0cfae3b133613dbc3178be6b4c1a4d"

// These are variables to populate the weather results. First one is current weather and the second is the 5Day forecast
var weatherForecastEl = document.querySelector(".weatherData");
var futureForecastEl = document.querySelector(".futureForecast");

 
// will use this to get the 5 day forecast
const getWeatherDetails= function (lat, lon) {
    const fiveDayApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(fiveDayApiUrl)
        .then(function(response){
            return response.json();
        })
        .then (function (data){
        
            // Now I have to figure out how to extract the data and display it where I need it. Also need to store the information as an object and dynamically create the button to be able to relaunch the search.

        });
}

const getCityCoordinates= function () {
    let cityName = citySearch.value.trim();
    if(!cityName)return //end/returns because the cityName was empty
    // this api link will include the lat and lon i need to extract for the 5 day
    const geoCodingApiUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`

//using the api link with my ID and the city name will get the response in the a JSON (object)format. Need to get the lat, lon and name of city from the object returned. Will use this for the 5 day weather forecast. If there is nothing in the object run the catch function which is an alert.
    fetch(geoCodingApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        if(!data.length)return alert(`No coordinatesfound for ${cityName}`);
        const {lat, lon}=data[0];
        getWeatherDetails(lat, lon)
    }).catch(function(err){
        console.error(err)
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

