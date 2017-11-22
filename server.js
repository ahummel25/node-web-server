const express = require('express')
const hbs = require ('hbs')
const fs = require ('fs')

const port = process.env.PORT || 8000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
   var now = new Date().toString()
   var log = `${now}: ${req.method} ${req.url}`
   fs.appendFile('server.log', log + '\n', (err) => {
       if (err) {
           console.log('Unable to append to log file.')
       }
   })
   next()
})

app.use((req, res, next) => {
    res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfill this request'
    })
})

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})

