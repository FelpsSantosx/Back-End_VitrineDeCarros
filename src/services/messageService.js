const Message = require('../models/message')

class MessageService {
    static async validateMessageData({ nome, email, telefone, mensagem, carro }) {
        try {
            if (!nome || !email || !telefone || !mensagem || !carro) {
                throw new Error("Nome, email, telefone e mensagem são obrigatórios")
            }
        } catch (error) {
            throw new Error("Erro ao validar mensagem: " + error.message)
        }
    }

    static async saveMessage({ nome, email, telefone, mensagem, carro }) {
        try {
            this.validateMessageData({ nome, email, telefone, mensagem, carro })

            const newMessage = new Message({
                nome,
                email,
                telefone,
                mensagem,
                carro
            })
            await newMessage.save()
            return newMessage
        } catch (error) {
            throw new Error("Erro ao salvar mensagem: " + error.message)
        }
    }

    static async generateWhatsAppLink({ nome, mensagem, carro }) {
        try {

            const numeroDoVendendor = ""

            const detalhesCarro = `
                Modelo: ${carro.modelo}
                Ano: ${carro.ano}
                Preço: R$${carro.preco}
                Cor: ${carro.cor}
                Câmbio: ${carro.cambio}
                Combustível: ${carro.combustivel}
                Quilometragem: ${carro.quilometragem}`.trim();

            const message = `Olá, meu nome é ${nome}. Gostaria de mais informações sobre o carro:\n\n${detalhesCarro}\n\n${mensagem}`
            const link = `https://wa.me/55${numeroDoVendendor}?text=${encodeURIComponent(message)}`
            return link
        } catch (error) {
            throw new Error("Erro ao gerar link do WhatsApp: " + error.message)
        }
    }

}

module.exports = MessageService