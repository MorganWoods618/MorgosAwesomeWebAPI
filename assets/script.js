$("#search-button").on("click",function(){
    var inputValue = $("#search-value").val()
    console.log (inputValue)
    geoCode(inputValue)
})

function geoCode (cityName){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=6ca3b3921f05e6965220c35abefb7227`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        getCurrentWeather(data[0].lat, data[0].lon)
        getForecast(data[0].lat, data[0].lon)
    })
}

function getCurrentWeather (lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly&appid=6ca3b3921f05e6965220c35abefb7227`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        var weatherCard = $("<div>").addClass("card")
        var temp = $("<h3>").text("temperature; " + data.main.temp)
        var cityName = $("<h3>").text(data.name)
        var humidity = $("<h3>").text("humidity; " + data.main.humidity)
        var wind = $("<h3>").text("Wind; " + data.wind.speed)
        weatherCard.append(cityName, temp, humidity, wind)
        $("#todayweather").append(weatherCard)
    })
}

function getForecast (lat, lon){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=6&appid=6ca3b3921f05e6965220c35abefb7227`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        for (var i = 1; i<data.list.length; i++){
        var weatherCard = $("<div>").addClass("card")
        var temp = $("<p>").text("temp; " + data.list[i].main.temp)

n

        weatherCard.append(temp)
        $("#fiveforecast").append(weatherCard)
        }
    })
}