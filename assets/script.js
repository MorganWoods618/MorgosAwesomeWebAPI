$("#search-button").on("click", function () {
    var inputValue = $("#search-value").val()
    console.log(inputValue)
    geoCode(inputValue)
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

//current
function getCurrentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly&appid=6ca3b3921f05e6965220c35abefb7227`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var weatherCard = $("<div>").addClass("today")
            weatherCard.attr('class', 'today');
            var temp = $("<h4>").text("Temperature: " + data.main.temp + "°F")
            var cityName = $("<h3>").text(data.name)
            var humidity = $("<h4>").text("Humidity: " + data.main.humidity + "%")
            var wind = $("<h4>").text("Wind: " + data.wind.speed + " MPH")
            var icon =$("<h4>").text(data.weather[0].icon)
            var today = moment().format('L');
            weatherCard.append(cityName, today, temp, humidity, wind, icon)
            $("#todayweather").append(weatherCard)
        })
}


//5 day
function getForecast(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=6&appid=6ca3b3921f05e6965220c35abefb7227`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (var i = 1; i < data.list.length; i++) {
                var weatherCard = $("<div>").addClass("card forecast")
                var date = $("<h4>").text(data.list[i].dt_txt)
                var temp = $("<p>").text("Temperature: " + data.list[i].main.temp + "°F")
                var humidity = $("<p>").text("Humidity: " + data.list[i].main.humidity + "%")
                var wind = $("<p>").text("Wind: " + data.list[i].wind.speed + " MPH")
                weatherCard.append(date, temp, humidity, wind)
                $("#fiveforecast").append(weatherCard)
                // $("#Day-1").append(weatherCard[0])
            }
        })
}


