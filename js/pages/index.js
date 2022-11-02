var n = document.getElementById("select");
var a = JSON.parse(localStorage.getItem('CITIES'));
var select = document.getElementById("select");
let ciudad= document.getElementById("ciu");
let img= document.getElementById("img");
let temp= document.getElementById("temp");
let sen= document.getElementById("sen");
let hum= document.getElementById("hum");
let vel= document.getElementById("vel");
let pre= document.getElementById("pre");


for (let i = 0; i < a.length; i++) {
    select.innerHTML += `<option value="${a[i]}">${a[i]}</option>`;
}

function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");
    if(cities) {
    cities = JSON.parse(cities);
    } else {
    cities = [];
    }
    console.log(cities);
    return cities;
}
var city
var response
var data

const seleccionarCiudad= async () => {
    city = document.getElementById("select").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f11c6986f11342cbed2f80bb626d6a8a&units=metric&lang=es`;
    response = await fetch(url);    

    try {
        if (response.ok) {
            data = await response.json();
            console.log(data);

        } else {
            console.log(response.status);
        }
    } catch (err) {
        console.log(err);
    }    

    if (city.length ==0 && city.value == null){

        var error = "seleccione una ciudad";
        alert(error);
    
    } else if (response.status == "404"){

        console.log("error");

    } else { 

        ciudad.innerHTML = city;
        img.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
        temp.innerHTML = "Temperatura: " + data.main.temp + " °C";
        sen.innerHTML = "Sensación Térmica: " + data.main.feels_like + " °C";
        hum.innerHTML = "Humedad: " + data.main.humidity + "%";
        vel.innerHTML = "Velocidad del viento: " + data.wind.speed + " m/s";
        pre.innerHTML =    "Presion: " + data.main.pressure + " hPa"
        document.getElementById("section-weather-result").style.display = "block";
    
    }
}
