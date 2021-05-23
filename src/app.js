const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define path for Express configs
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Gaurav Singh'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Gaurav Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help me!',
        name: 'Gaurav Singh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide address term'
        })
    }

    geoCode(req.query.address, (error, {lat, lon} = {}) => {
        if (error){
           return res.send({
               error: 'not able to geoCode!'
           })
        }
        // console.log('data = ', geoCodeData)
        forecast(lon, lat, (error, forecastData) => {
            if (error){
                return res.send({
                    error: 'not able to get the forecast'
                })
            }
            console.log(forecastData)
            res.send({
                address: req.query.address,
                forecast: forecastData
          })
    })



    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404 Page',
        Creator: 'Gaurav',
        errorMessage: 'Help Article Not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404 Page',
        Creator: 'Gaurav',
        errorMessage: 'Page Not found!'
    })
})

app.listen(port, () => {
    console.log('Server is running on port '+port)
})

