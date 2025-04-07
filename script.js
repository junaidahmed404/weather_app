const apiKey = "9afb0dc14f051f50a8d2bf62b683211c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchInput = document.querySelector(".searchBox input");
const searchBtn = document.querySelector("#btn");
const imageIcon = document.querySelector("#weatherImg");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);
        document.querySelector(".cityName").innerHTML = data.name; 
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";  
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Update image based on weather condition
        switch (data.weather[0].main) {
            case "Clouds":
                imageIcon.src = "images/clouds.png";
                break;
            case "Clear":
                imageIcon.src = "images/clear.png";
                break;
            case "Rain":
                imageIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                imageIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                imageIcon.src = "images/mist.png";
                break;
            case "Snow":
                imageIcon.src = "images/snow.png";
                break;
            default:
                // Set a default image if the weather condition is not recognized
                imageIcon.src = "images/clear.png";
        }
    } catch (error) {
        console.log("Error fetching weather data: ", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchInput.value);
    }
});

// Optionally, you can also trigger the weather check on page load
checkWeather("Larkana");
