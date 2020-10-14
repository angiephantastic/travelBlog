const addLocationForm = document.getElementById("addLocationForm")
const detailDescription = document.getElementById("detailDescription")

const cityInput = document.getElementById("cityInput")
const countryInput = document.getElementById("countryInput")
const dateInput = document.getElementById("dateInput")

const getInfo = () => {
    let places = localStorage.getItem("places")
    
    if(!places) {
        return []
    }
    places = JSON.parse(places)

    places.forEach((place) => {
        place.weatherInfo = getWeatherInfo(place.city)
    })
    return places
}

function getWeatherInfo(cityName) {
    const key = "d6f595f46674408259ff7b3919758466"
    // const cityName = getInfo(place.city)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`)
        .then((response) => response.json())
        .then((json) => {
            const info = json
            const weather = info.main.temp
        // console.log(cityName)
        // console.log(weather)
        return weather 
        })
}

const savePlaces = (eachPlace) => {
    const places = getInfo()
    places.push(eachPlace)

    const stringifiedPlaces = JSON.stringify(places)
    localStorage.setItem("places", stringifiedPlaces)
}

const newPlace = (event) => {
    event.preventDefault()

    const city = cityInput.value
    const country = countryInput.value
    const date = dateInput.value
    
    const eachPlace = {
        city,
        country,
        date,
    }
    
    cityInput.value = ""
    countryInput.value = ""
    dateInput.value = ""

    addDestination(eachPlace)
}

addLocationForm.addEventListener("submit", newPlace)

const addDestination = (eachPlace) => {
    savePlaces(eachPlace)
    createInfo()
}

const textDescription = (eachPlace) => {
    let someText = `
    <p>City: ${eachPlace.city}</p>
    <p>Country: ${eachPlace.country}</p>
    <p>Travel Date: ${eachPlace.date}</p>
    <p>Current Weather: ${eachPlace.weatherInfo}</p>
    `
    return someText
}

const createInfo = () => {
    detailDescription.innerHTML = ""

    getInfo().forEach((eachPlace, index) => {

        const childElement = document.createElement("div")
        childElement.className = "col-4 destinationDetails"
        childElement.classList.add("eachDiv")
        const detail = textDescription(eachPlace)
        childElement.innerHTML = detail

        const removeButton = document.createElement("button")
        removeButton.innerHTML = "Remove"
        childElement.appendChild(removeButton)
        removeButton.addEventListener("click", () => {
            removePlace(index)
            createInfo()
        })
        detailDescription.appendChild(childElement)
    })
}

const removePlace = (index) => {
    const places = getInfo()
    places.splice(index, 1)

    const stringifiedPlaces = JSON.stringify(places)
    localStorage.setItem("places", stringifiedPlaces)
}

createInfo()