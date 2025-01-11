const Car = require("../models/car")

class CarService {
    static async create(data, files) {
        try {

            const imagemPrincipal = files?.imagemPrincipal?.[0]?.filename || null
            const galeria = files?.galeria?.map(file => file.filename) || null

            console.log(imagemPrincipal, galeria);

            const car = await Car.create({
                ...data,
                imagemPrincipal,
                galeria,
            })  

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

   static async findCarById(id) {
    try {
        console.log(`Buscando carro pelo ID: ${id}`)
        const car = await Car.findById(id)
        console.log("Resultado da consulta:", car)
        return car
    } catch (error) {
        console.error("Erro ao buscar carro:", error)
        throw new Error("Problemas ao buscar detalhes do carro pela id:" + error.message)
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
