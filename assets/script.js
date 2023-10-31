function initPage(){
    let citySearch = document.querySelector("#cityInput");
    const searchButton=document.querySelector("#searchBtn");
    const apiKey = "fc0cfae3b133613dbc3178be6b4c1a4d"

    // These are variables to populate the weather results. Will use these to place the weather information. 
    let weatherForecastDiv = document.querySelector(".weatherData");
    let futureForecastDiv = document.querySelector(".futureForecast");
    let currentWeatherInfoDiv = document.querySelector(".currentWeatherInfo");
    // let detailsDiv = document.querySelector(".details");
    // let iconDiv = document.querySelector(".icon")
    let weatherCardsDiv = document.querySelector(".weatherCards");
    let weatherForecastLi = document.querySelector(".card");

    // establishing the list for local storage
    if(localStorage.getItem('history')===null){
    localStorage.setItem("history","");
    };

    // will use this to get the 5 day forecast
    const getWeatherDetails= function (lat, lon) {
        const fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    // const getWeatherDetails= function (cityName) {
    //     const fiveDayApiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;


        fetch(fiveDayApiUrl)
            .then(function(response){
                return response.json();
            })
            .then (function (data){
            console.log(data);
        //    runs the function to clear previous information.
            clearCards();
        /*adding information for current weather*/
            let today = dayjs();
            let detailsDiv = document.createElement('div');
            let iconDiv = document.createElement('div');
            detailsDiv.className='details';
            iconDiv.className='icon';
            let citySearching = document.createElement('h2');
            let currentDate = document.createElement('h2');
            citySearching.textContent=data.city.name;
            currentDate.textContent=today.format('MMMM D, YYYY');
            detailsDiv.appendChild(citySearching);
            detailsDiv.appendChild(currentDate);

            let currentTemp = document.createElement('h4');
            currentTemp.textContent= "Temp: " + Math.round(data.list[0].main.temp)+"°";
            detailsDiv.appendChild(currentTemp);

            let currentWind = document.createElement('h4');
            currentWind.textContent="Wind Speed: " + data.list[0].wind.speed +"mph";
            detailsDiv.appendChild(currentWind);

            let currentHumidity = document.createElement('h4');
            currentHumidity.textContent="Humidity: " + data.list[0].main.humidity +"%";
            detailsDiv.appendChild(currentHumidity);
            
            currentWeatherInfoDiv.appendChild(detailsDiv); 

            let currentPic = document.createElement("img");
            currentPic.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png");
            currentPic.setAttribute("alt", data.list[0].weather[0].description);
            iconDiv.appendChild(currentPic);
            
            currentWeatherInfoDiv.appendChild(iconDiv);   
            
                /* Now I have to figure out how to extract the data and display it where I need it. Also need to store the information as an object and dynamically create the button to be able to relaunch the search.
                    */  
            
            /*Weather card. Make one and then Append?*/
            for (i=5;i<40;i+=8){
                let nextDay = data.list[i].dt
                let formattedNextDay = new Date(nextDay * 1000).toLocaleDateString()
                
                let card = document.createElement('div');
                card.classList.add('card');
            
                let forecastDate = document.createElement('h3');
                forecastDate.textContent=formattedNextDay;
                // weatherCardsDiv.appendChild(forecastDate);
                card.appendChild(forecastDate);
                

                let forecastPic = document.createElement("img");
                forecastPic.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
                forecastPic.setAttribute("alt", data.list[i].weather[0].description);
                // weatherCardsDiv.appendChild(forecastPic);
                card.appendChild(forecastPic);
                
    
                let forecastTemp = document.createElement('h4');
                forecastTemp.textContent= "Temp: " + Math.round(data.list[i].main.temp)+"°";
                // weatherCardsDiv.appendChild(forecastTemp);
                card.appendChild(forecastTemp);
    
                let forecastWind = document.createElement('h4');
                forecastWind.textContent="Wind Speed: " + data.list[i].wind.speed +"mph";
                // weatherCardsDiv.appendChild(forecastWind);
                card.appendChild(forecastWind);
    
                let forecastHumidity = document.createElement('h4');
                forecastHumidity.textContent="Humidity: " + data.list[i].main.humidity +"%";
                // weatherCardsDiv.appendChild(forecastHumidity);
                card.appendChild(forecastHumidity);
                

                weatherCardsDiv.appendChild(card);
            }
                
            });
    }

    const getCityCoordinates= function () {
        let cityName = citySearch.value.trim();
        if(!cityName)return //end/returns because the cityName was empty
        // this api link will include the lat and lon i need to extract for the 5 day
        const geoCodingApiUrl=`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`

        //using the api link with my ID and the city name will get the response in the a JSON (object)format. Need to get the lat, lon and name of city from the object returned. Will use this for the 5 day weather forecast. If there is nothing in the object run the catch function which is an alert.
        

        fetch(geoCodingApiUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if(!data.length)return alert(`No coordinatesfound for ${cityName}`);
            const {lat, lon}=data[0];
            getWeatherDetails(lat, lon)
        }).catch(function(err){
            console.error(err)
            alert("An error occured while fetching the coordinates.");
        });

        let storedCity = [];

        if(localStorage.getItem('history')===null){
        storedCity = JSON.parse(localStorage.getItem("history"));
        }
        storedCity.push(cityName);
        localStorage.setItem("history",JSON.stringify(storedCity));
        
        }

        function clearCards() {
            let oldCards = document.getElementsByClassName("card");
            // console.log(oldCards.length);
            // console.log(oldCards);
            for (let j=oldCards.length -1;j>=0; j--){
                // console.log(j);
                // console.log(oldCards[j]);
                oldCards[j].remove();
            }
         
            let oldDetails = document.getElementsByClassName("details");
            let oldIcon = document.getElementsByClassName("icon");  
            console.log(oldDetails);
            if (oldDetails.length>0) {
                oldDetails[0].remove();
            } 
            if (oldIcon.length>0)  {
                oldIcon[0].remove();
            }     

        }
    searchButton.addEventListener("click", getCityCoordinates);
}

initPage();








