const MessageService = require("../services/messageService")

class MessageController {
    static async sendMessage(req, res) {
        try {
            const { nome, mensagem, carro } = req.body;

            // Gera o link para o WhatsApp
            const linkWhatsApp = await MessageService.generateWhatsAppLink({ nome, mensagem, carro });

            return res.status(201).json({ success: true, whatsAppLink: linkWhatsApp });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = MessageController
