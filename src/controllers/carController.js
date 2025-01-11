const CarService = require("../services/carService")
const mongoose = require("mongoose")

class CarController {
    static async create(req, res) {
        try {
            
            const data = req.body
            const files = req.files
            
            console.log(req.files)

            const car = await CarService.create(data, files)
            res.status(201).json(car)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getAll(req, res) {
        try {
            const cars = await CarService.getAll()
            res.status(201).json(cars)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getCarById(req, res) {
        try {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido" })
            }

            const car = await CarService.findCarById(id)

            if (!car) {
                return res.status(404).json({ message: "Carro não encontrado" })
            }

            return res.status(200).json(car)
        } catch (error) {
            console.error("Erro ao buscar o carro:", error)
            return res.status(500).json({ message: "Erro no servidor", error: error.message })
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
