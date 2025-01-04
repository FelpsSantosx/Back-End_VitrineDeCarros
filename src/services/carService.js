const Car = require("../models/car")

class CarService {
    static async create(carData) {
        try {
            const car = new Car(carData)
            await car.save()
            return car
        } catch (error) {
            throw new Error("Problema ao salvar Carro: " + error.message)
        }
    }

    static async getAll() {
        try {
            const cars = await Car.find()
            return cars
        } catch (error) {
            throw new Error("Problemas ao buscar carros:" + error.message)
        }
    }

    static async update(id, data) {
        try {
            const car = await Car.findByIdAndUpdate(id, data, { new: true })
            if (!car) {
                throw new Error("Carro não encontrado")
            }
            return car
        } catch (error) {
            throw new Error("Problema ao atualizar o carro selecionado: "
                + error.message);
        }
    }

    static async delete(id) {
        try {
            const car = await Car.findByIdAndDelete(id)
            if (!car) {
                throw new Error('Carro não encontrado')
            }
            return car
        } catch (error) {
            throw new Error("Não foi possivel excluir o carro: " + error.message)
        }
    }
}

module.exports = CarService
