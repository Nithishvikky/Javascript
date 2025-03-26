const APIKey = "3154f6bfebefea4aa36f34ddab048dcc";
const search = document.getElementById("btn");
const cityInput = document.getElementById("input");
const Content = document.getElementById("content");
let city;

function Apicall(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById("city-name").textContent = data.name;
        document.getElementById("condition").textContent = "Weather Condition of  "+data.name+" is "+data.weather[0].description;
        document.getElementById("temp").textContent = "Temperature : "+data.main.temp+"°C";
        document.getElementById("hum").textContent = "Humidity : "+data.main.humidity+"%";
    })
    .catch(error =>{
        console.error(error);
        document.getElementById("condition").textContent = "Check the city name..City not found.";
    });
}
function getCityName(){
    if(cityInput.value){
        city = cityInput.value.trim();
        cityInput.value = "";
        Apicall();
        Content.style.opacity = 1;
        Content.style.visibility = "visible";
    }
}

search.addEventListener("click",()=>getCityName()); // When I click search button
document.addEventListener("keydown",(e)=> (e.key === "Enter")? getCityName():""); // When I press enter