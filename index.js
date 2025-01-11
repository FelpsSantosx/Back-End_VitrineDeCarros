require("dotenv").config()

const express = require("express")
const Databse = require("./src/config/db")
const cors = require('cors')
const path = require("path")

const app = express()

app.use(express.json())

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')))

app.use(cors())

app.get('/', (req, res) => {
    res.send("Ola, Express!")
})

app.use('/', require('./src/routes/carRoutes'))

Databse.connect().then(() => {

    const PORT = process.env.PORT || 3000

    setTimeout(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`)
        })
    }, 1200)
})
