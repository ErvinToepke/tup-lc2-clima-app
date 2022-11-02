function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");
    if(cities) {
    cities = JSON.parse(cities);
    } else {
    cities = [];
    }
    return cities;
}

const agregarCiudad= async () => {
    var newCity = document.getElementById("addCity").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=f11c6986f11342cbed2f80bb626d6a8a&units=metric&lang=es`;
    var response = await fetch(url);
    var data

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

    let ciudadAgregada = document.getElementById("addCity").value;
    let cities = getCitiesFromLocalStorage();

    document.getElementById("warning").style.display = "none";
    document.getElementById("danger").style.display = "none";
    document.getElementById("success").style.display = "none";

    if(cities.indexOf(ciudadAgregada) >=0) {    

        document.getElementById("warning").style.display = "block";

    } else if (ciudadAgregada == "") {

        document.getElementById("danger").style.display = "block";

    }   else if(response.status == "404"){

        document.getElementById("danger").style.display = "block";

    } else {

        cities.push(ciudadAgregada);  
    
        document.getElementById("success").style.display = "block";
    }

    localStorage.setItem("CITIES",JSON.stringify(cities));
}