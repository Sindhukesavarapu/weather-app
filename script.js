const
    wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    weatherPart = wrapper.querySelector(".weather-part"),
    wIcon = weatherPart.querySelector("img"),
    arrowBack = wrapper.querySelector("header i");
const datetimeElement = document.querySelector(".datetime");
let api;

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});
const defaultLocation = "Visakhapatnam"; // Define the default search location

// Function to load weather data for the default location on page load
function loadDefaultWeather() {
    requestApi(defaultLocation);
}

document.addEventListener("DOMContentLoaded", loadDefaultWeather); // Load default weather data when the page is loaded

inputField.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        if (inputField.value !== "") {
            requestApi(inputField.value);
        } else {
            requestApi(defaultLocation); // Use the default location if the input is empty
        }
    }
});


function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4755d8a121d58b361f6a66b0425dad93`;


    fetchData();
}

function fetchData() {

    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        ;
    });
}

function weatherDetails(info) {
    if (info.cod != "404") {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { temp, feels_like, humidity } = info.main;
        const currentDate = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
        const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);
        const windSpeed = info.wind.speed;


        console.log(city, country, description);
        if (id == 800) {
            wIcon.src = "assets/sun.png";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "assets/storm.png";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "assets/snow.png";
        } else if (id >= 701 && id <= 781) {
            wIcon.src = "assets/haze.png";
        } else if (id >= 801 && id <= 804) {
            wIcon.src = "assets/cloudy.png";
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            wIcon.src = "assets/rain.png";
        }

        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
        datetimeElement.innerText = `${formattedTime},${formattedDate}`;
        weatherPart.querySelector(".wind .wind-speed").innerText = `${windSpeed} m/s`;

    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});
