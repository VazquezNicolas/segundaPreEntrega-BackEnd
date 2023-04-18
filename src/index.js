const express = require ('express');
const mongoConnect = require('../db');
const router = require('./router');


const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoConnect()
router(app)

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})