const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    nome: { type: String, required: true, },
    email: { type: String, required: true, },
    telefone: { type: String, required: true, },
    mensagem: { type: String, required: true, },
    carro: {
        modelo: String,
        ano: String,
        preco: String, 
        cor: String, 
        cambio: String, 
        combustivel: String, 
        quilometragem: String
    },
    dataEnvio: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Message', messageSchema)