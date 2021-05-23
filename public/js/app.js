console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From Java Script'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchTerm.value

    console.log('location '+location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const address = location
    // const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ3J2c2luZ2g2NCIsImEiOiJja296ZjlnYW0wdTU5MnFxcXA4eHZzd3VhIn0.2OHU09qCHzUtwF40UFgzFQ'
    const url = '/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = ''
                messageTwo.textContent = "the temperature is " + data.forecast.temp + "  and it feels like " + data.forecast.feelslike
                console.log(data)
            }
        })
    })

})