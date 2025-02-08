const express = require("express")
const MessageController = require("../controllers/messageController")

const router = express.Router()

router.post('/message', MessageController.sendMessage)

module.exports = router