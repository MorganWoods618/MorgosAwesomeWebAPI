var historyArray = JSON.parse(localStorage.getItem("City")) || []

//search button
$("#search-button").on("click", function () {
    $("#todayweather").empty()
    $("#fiveforecast").empty()
    var inputValue = $("#search-value").val()
    console.log(inputValue)
    geoCode(inputValue)
    historyArray.push(inputValue)
    //local storage
    localStorage.setItem("City", JSON.stringify(historyArray));
    localStorage.getItem("City");
    var cityButton = $("<button>").addClass("btn btn-info").text(inputValue)
    $("#history-storage").append(cityButton)
})

//clear history
$("#clear-search").on("click", function () {
    localStorage.clear();
    location.reload();
}
)

for (var i = 0; i < historyArray.length; i++) {
    var cityButton = $("<button>").addClass("btn btn-info").text(historyArray[i])
//add click event or event listener to the city button var that will attach to each button which fires the geocode function based on button city value
    $("#history-storage").append(cityButton)
}
//history button
$("#history-storage").on("click", function () {
    localStorage.getItem("City");

    // cityButton.on("click", geoCode () {

    // }
    // )
})

function geoCode(cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=6ca3b3921f05e6965220c35abefb7227`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getCurrentWeather(data[0].lat, data[0].lon)
            getForecast(data[0].lat, data[0].lon)
        })
}

$("#btn-info").val(localStorage.getItem("city"));

//current
function getCurrentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,daily&appid=6ca3b3921f05e6965220c35abefb7227`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // var historyArray = JSON.parse(localStorage.getItem("City"))||[]
            var weatherCard = $("<div>").addClass("today")
            weatherCard.attr('class', 'today');
            var temp = $("<div>").text("Temp: " + data.current.temp + "°F")
            var cityStored = JSON.parse(localStorage.getItem("City"))
            console.log(cityStored)
            var humidity = $("<div>").text("Humidity: " + data.current.humidity + "%")
            var wind = $("<div>").text("Wind: " + data.current.wind_speed + " MPH")
            var uvIndex = $("<button>").text("UV Index: " + data.current.uvi)
            if (data.current.uvi < 3) {
                uvIndex.addClass("btn-success")
            }
            else if(data.current.uvi > 3 && data.current.uvi < 5){
                uvIndex.addClass("btn-warning")

            }
            else {
                uvIndex.addClass("btn-danger")
            }

            var date = moment().format(' l');
            var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png")
            icon.attr('class', 'icon')
            weatherCard.append(cityStored, date, icon, temp, humidity, wind, uvIndex)
            $("#todayweather").append(weatherCard)
        })
}


//5 day
function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,current&appid=6ca3b3921f05e6965220c35abefb7227`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (var i = 1; i < 6; i++) {
                var weatherCard = $("<div>").addClass("card forecast")
                var date = $("<div>").text(moment.unix(data.daily[i].dt).format("MM/DD/YY"))
                var temp = $("<div>").text("Temp: " + data.daily[i].temp.max + "°F")
                var humidity = $("<div>").text("Humidity: " + data.daily[i].humidity + "%")
                var wind = $("<div>").text("Wind: " + data.daily[i].wind_speed + " MPH")
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png")
                icon.attr('class', 'icon-large')
                weatherCard.append(date, icon, temp, humidity, wind)
                $("#fiveforecast").append(weatherCard)
            }
        })
}

