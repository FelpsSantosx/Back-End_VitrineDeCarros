const CarService = require("../services/carService")

class CarController {

    static async create(req, res) {
        try {
            const car = await CarService.create(req.body)
            res.status(201).json(car)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getAll(req, res) {
        try {
            const cars = CarService.getAll()
            res.status(201).json(cars)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async update(req, res) {
        
        const { id } = req.params
        const updateData = req.body

        try {
            const updatedCar = await CarService.update(id, updateData)
            res.status(200).json(updatedCar)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async delete(req, res) {

        const { id } = req.params

        try {
            const carDelete = await CarService.delete(id)
            res.status(200).json(carDelete)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = CarController
