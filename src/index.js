const express = require ('express');
const mongoConnect = require('../db');
const router = require('./router');
const handlebars = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require("handlebars")

const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
)
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

mongoConnect()
router(app)

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})