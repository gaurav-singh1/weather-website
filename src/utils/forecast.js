const request = require('request')


const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d3b32c5707a13b19ee255b49d5bd4421&query='+ lon + ',' + lat + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect with the url', undefined)
        } else if (body.error) {
            callback('Unable to find the coordinates', undefined)
        } else{
            callback(undefined, {
                temp : body.current.temperature,
                feelslike : body.current.feelslike + " and the humidity is " + body.current.humidity
            })
        }
    })
}

module.exports = forecast