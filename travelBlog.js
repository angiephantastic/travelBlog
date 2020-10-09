const addLocationForm = document.getElementById("addLocationForm")
const detailDescription = document.getElementById("detailDescription")

const cityInput = document.getElementById("cityInput")
const countryInput = document.getElementById("countryInput")
const dateInput = document.getElementById("dateInput")

//initial view on load 
const getInfo = () => {
    const places = localStorage.getItem("places")

    if(!places) {
        return []
    }

    return JSON.parse(places)
    //data received from local returns a string
    //JSON.parse translate it into an object
}


const getWeatherInfo = () => {
    const key = "d6f595f46674408259ff7b3919758466"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}`)
    .then((response) => response.json())
    .then((json) => {
        const info = json
        const condition = info.weather[0].icon

        let someText = `
        <p>Current weather: ${info.main.temp}°C</p>
        <img src="http://openweathermap.org/img/wn/${condition}@2x.png">
        `
        return someText
    })
}

console.log(getWeatherInfo())

//takes eachPlace and adds it to a list of places
const savePlaces = (eachPlace) => {
    const places = getInfo()
    places.push(eachPlace)

    const stringifiedPlaces = JSON.stringify(places)
    //const places calls getInfo() and returns an object
    //then JSON.strigify translate it back into strings
    //then saves to local storage below

    localStorage.setItem("places", stringifiedPlaces)
}

//create a newPlace with input info
const newPlace = (event) => {
    event.preventDefault()

    const city = cityInput.value
    const country = countryInput.value
    const date = dateInput.value
    
    const eachPlace = {
        city,
        country,
        date
    }
    
    //reset input fields
    cityInput.value = ""
    countryInput.value = ""
    dateInput.value = ""

    addDestination(eachPlace)
}

//newPlace() is called when the "submit" button is clicked
addLocationForm.addEventListener("submit", newPlace)


//takes eachPlace and calls savePlaces
//then create a new div with createInfo()
const addDestination = (eachPlace) => {
    savePlaces(eachPlace)
    createInfo()
}

//create text output inside div that is created
//with createInfo()
const textDescription = (eachPlace) => {
    let someText = `
    <p>City: ${eachPlace.city}</p>
    <p>Country: ${eachPlace.country}</p>
    <p>Travel Date: ${eachPlace.date}</p>
    <p>Current Weather: </p>
    `
    return someText
}

//create a div with all contents and a remove button
//with an event listener that calls removePlace() when click
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

//remove button function
const removePlace = (index) => {
    const places = getInfo()
    places.splice(index, 1)

    const stringifiedPlaces = JSON.stringify(places)
    localStorage.setItem("places", stringifiedPlaces)
}

createInfo()