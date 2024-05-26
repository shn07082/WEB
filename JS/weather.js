const WEATHER_API_KEY = "0eb3c18f86fc6fc3b7f1922d73ae5779";
const WEATHER_INFO = document.querySelector(".weatherInfo");
const WEATHER_ICON_IMG = document.querySelector(".weatherIcon");

function initWeather() {
    askForCoords();
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    updateWeather(latitude, longitude);
}

function handleError(error) {
    console.log("Error:", error.message);
    // 위치를 가져올 수 없는 경우에 대한 예외 처리
    alert("위치 정보를 가져올 수 없습니다. 기본 위치로 날씨를 표시합니다.");
    // 기본 위치로 설정 (서울을 기본 위치로 설정)
    updateWeather(37.5665, 126.978);
}

// 새로운 위치를 선택하거나 검색할 때마다 호출되는 함수
function updateWeather(lat, lon) {
    getWeather(lat, lon);
}

// 지도에서 새로운 위치를 선택할 때 호출되는 함수
function onMapLocationSelected(lat, lon) {
    updateWeather(lat, lon);
}

// 검색한 주소에 해당하는 위치를 선택할 때 호출되는 함수
function onLocationSearched(lat, lon) {
    updateWeather(lat, lon);
}

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const weatherIcon = json.weather[0].icon;
            const weatherDescription = convertWeatherDescription(
                json.weather[0].description
            );

            const weatherIconAdrs = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            const weatherIconHTML = `<img src="${weatherIconAdrs}" alt="Weather Icon" style="display: inline-block; vertical-align: middle;">`;
            const temperatureHTML = `<span style="display: inline-block; vertical-align: middle; margin-right: 20px;">${temperature} °C</span>`;
            const weatherDescriptionHTML = `<span style="display: inline-block; vertical-align: middle; margin-left: 10px;">${weatherDescription}</span>`;
            WEATHER_INFO.innerHTML = `${weatherIconHTML}${temperatureHTML}${weatherDescriptionHTML}`;
        })
        .catch((error) => console.log("Error:", error));
}

function convertWeatherDescription(description) {
    switch (description) {
        case "clear sky":
            return "맑음";
        case "few clouds":
            return "구름 조금";
        case "scattered clouds":
            return "구름 많음";
        case "broken clouds":
            return "구름 낌";
        case "shower rain":
            return "소나기";
        case "rain":
            return "비";
        case "thunderstorm":
            return "천둥 번개";
        case "snow":
            return "눈";
        case "mist":
            return "안개";
        default:
            return description;
    }
}

initWeather();
