const MessageService = require("../services/messageService")

class MessageController {
    static async sendMessage(req, res) {
        try {
            const { nome, email, telefone, mensagem, carro } = req.body;

            // Chamamos o service, que já faz a validação e o salvamento
            const savedMessage = await MessageService.saveMessage({ nome, email, telefone, mensagem, carro });

            // Gera o link para o WhatsApp
            const linkWhatsApp = MessageService.generateWhatsAppLink({ telefone, nome, mensagem, carro });

            return res.status(201).json({
                message: "Mensagem enviada com sucesso!",
                whatsAppLink: linkWhatsApp,
                savedMessage
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = MessageController
