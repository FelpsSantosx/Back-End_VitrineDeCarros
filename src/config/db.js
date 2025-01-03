const mongoose = require('mongoose')

class Database {
    static async connect() {
        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log("Database conectada com sucesso!")
        } catch (error) {
            console.error("Conexão perdida com a database", error)
            process.exit(1)
        }
    }
}

module.exports = Database