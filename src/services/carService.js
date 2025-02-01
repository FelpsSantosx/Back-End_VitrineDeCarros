const Car = require("../models/car")

class CarService {
    static async create(data, files) {
        try {
            const imagemPrincipal = files?.imagemPrincipal?.[0]?.filename || "Deu Error"
            const galeria = files?.galeria?.map(file => file.filename) || "Deu Error de novo"

            console.log(imagemPrincipal, galeria);

            const car = await Car.create({
                ...data,
                imagemPrincipal: `/uploads/${imagemPrincipal}`,
                galeria: galeria.map(filename => `/uploads/${filename}`),
            })

            return car
        } catch (error) {
            throw new Error("Problema ao salvar Carro: " + error.message)
        }
    }

    static async getAll(page, limit) {
        try {
            const pageNumber = parseInt(page, 10) || 1
            const pageLimit = parseInt(limit, 10) || 10

            const cars = await Car.find()
                .skip((pageNumber - 1) * pageLimit)
                .limit(pageLimit)

            const total = await Car.countDocuments()

            return {
                cars,
                totalPages: Math.ceil(total / pageLimit),
                totaItems: total,
            }
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

    static async searchCarsFilter(query) {
        try {
            const {
                modelo,
                precoMin,
                precoMax,
                cambio,
                combustivel,
                ano,
                quilometragem,
                cor,
                page = 1,
                limit = 10,
            } = query;

            const filters = {};
            if (modelo) filters.modelo = new RegExp(modelo, "i");
            if (precoMin || precoMax) {
                filters.preco = {};
                if (precoMin) filters.preco.$gte = parseFloat(precoMin);
                if (precoMax) filters.preco.$lte = parseFloat(precoMax);
            }
            if (cambio) filters.cambio = cambio;
            if (combustivel) filters.combustivel = combustivel;
            if (ano) filters.ano = parseInt(ano);
            if (quilometragem) filters.quilometragem = parseInt(quilometragem);
            if (cor) filters.cor = cor;

            // Paginação
            const skip = (page - 1) * limit;
            const totalCount = await Car.countDocuments(filters);
            const cars = await Car.find(filters).skip(skip).limit(parseInt(limit));

            return {
                cars,
                totalCount,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / limit),
            };

        } catch (error) {
            console.error("Erro no serviço de carros:", error);
            throw new Error("Erro ao buscar carros com filtros");
        }
    }
}
module.exports = CarService
