require("dotenv").config()

const express = require("express")
const Databse = require("./src/config/db")
const cors = require('cors')

const app = express()

app.use(express.json())

// app.use('/uploads', express.static(path.resolve(__dirname, 'uploads'))) // com Cloudinary não precisamos mais disso

app.use(cors({
    origin:[ 'https://topcar-online.netlify.app', 'http://localhost:5173' ], // Domínio do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}))

app.get('/', (req, res) => {
    res.send("Ola, Express!")
})

// Importações de Rotas
const carRoutes = require("./src/routes/carRoutes")
const messageRoutes = require("./src/routes/messageRoutes") 

// Definindo as rotas
app.use("/", carRoutes)
app.use("/messages", messageRoutes)


Databse.connect().then(() => {

    const PORT = process.env.PORT || 3000

    setTimeout(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`)
        })
    }, 1200)
})
