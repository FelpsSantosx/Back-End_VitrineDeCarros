const express = require("express")
const CarController = require("../controllers/carController")
const upload = require('../config/multerconfig')


const router = express.Router()

router.post('/cars', upload.single('imagemPrincipal'), CarController.create)

router.get('/cars', CarController.getAll)

router.get("/cars/:id", CarController.getCarById)

router.put('/cars/:id', CarController.update)

router.delete('/cars/:id', CarController.delete)


module.exports = router