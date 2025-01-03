const express = require("express")
const CarController = require("../controllers/carController")

const router = express.Router()

router.post('/cars', CarController.create);

router.get('/cars', CarController.getAll);

router.put('/cars/:id', CarController.update);

router.delete('/cars/:id', CarController.delete);


module.exports = router;