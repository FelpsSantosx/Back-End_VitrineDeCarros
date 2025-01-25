const express = require("express")
const CarController = require("../controllers/carController")
const upload = require("../config/multer")

const router = express.Router()

router.post('/cars', upload.fields([
    { name: 'imagemPrincipal', maxCount: 1 },
    { name: 'galeria' }
]), CarController.create)

router.get('/cars', CarController.getAll)

router.get("/cars/:id", CarController.getCarById)

router.put('/cars/:id', CarController.update)

router.delete('/cars/:id', CarController.delete)

router.get("/search", CarController.searchCarsFilter)


module.exports = router