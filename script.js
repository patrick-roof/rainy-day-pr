const today = dayjs()
$('#currentDay').text(today.format('MM/DD'));
console.log(today);

const day1date = dayjs().add(1, 'day')
$('#day1date').text(day1date.format('MM/DD'));

const day2date = dayjs().add(2, 'day')
$('#day2date').text(day2date.format('MM/DD'));

const day3date = dayjs().add(3, 'day')
$('#day3date').text(day3date.format('MM/DD'));

const day4date = dayjs().add(4, 'day')
$('#day4date').text(day4date.format('MM/DD'));

const day5date = dayjs().add(5, 'day')
$('#day5date').text(day5date.format('MM/DD'));

var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');

var daysArray = [day1,day2,day3,day4,day5];

var searchHistory = [];

let weather = {
    apiKey: 'd9d9c2b250611e67725494f9e6abec68',
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city
              + "&units=imperial&appid="
               + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {

        const { name } = data
        const { icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,temp,humidity,speed);
        document.querySelector(".city").innerText = 'Weather in ' + name + ' - ' + today.format('MM/DD');
        document.querySelector(".icon").src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        document.querySelector(".temp").innerText = temp + '°F';
        document.querySelector(".humidity").innerText = 'Humidity: ' + humidity + '%';
        document.querySelector(".wind-speed").innerText = 'Wind: ' + speed + 'mph';
    },
    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

document.querySelector('.searchBtn').addEventListener('click', function () {
    weather.search();
    forecast.search();
    addSearchHistory();
})

let forecast = {
    apiKey: 'd9d9c2b250611e67725494f9e6abec68',
    fetchForecast: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" 
            + city
             + "&units=imperial&appid="
              + this.apiKey
               
        )
            .then((response) => response.json())
            .then((data) => this.displayForecast(data));
    },
    displayForecast: function(dataForecast) {
        console.log(dataForecast);
        let index = 1;
        for (let i=0; i < dataForecast.list.length; i++) {
            if (dataForecast.list[i].dt_txt.indexOf('12:00:00') > 0 ) {
                let data = dataForecast.list[i]
                const { icon } = data.weather[0];
                const { temp, humidity } = data.main;
                const { speed } = data.wind;
                console.log(icon,temp,humidity,speed);
                document.querySelector("#day" + index + " .forecast-icon").src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
                document.querySelector("#day" + index + " .forecast-temp").innerText = temp + '°F';
                document.querySelector("#day" + index + " .forecast-humidity").innerText = 'Humidity: ' + humidity + '%';
                document.querySelector("#day" + index + " .forecast-wind-speed").innerText = 'Wind: ' + speed + 'mph';
                index += 1
            }
        }
    },
    search: function () {
        this.fetchForecast(document.querySelector('.search-bar').value);
    }
};

function addSearchHistory() {
    var weatherLog = document.querySelector('.search-bar').value;
    console.log(weatherLog);
    searchHistory.push(weatherLog)
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    createSearch()
}

function createSearch() {
    localStorage.getItem('search-history', JSON.parse(searchHistory));
    var searchedItem = ('search-history');
    var searchHistoryEl = $('<button class="searchResult">');
    searchHistoryEl.text(searchBar);
    searchedItem.append(searchHistoryEl);
}