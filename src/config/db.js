const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

class Database {
    static async connect() {
        try {
            await mongoose.connect(`mongodb+srv://${user}:${password}@topcaronline.v9rvl.mongodb.net/?retryWrites=true&w=majority&appName=TopcarOnline`)
            console.log("Database conectada com sucesso!")
        } catch (error) {
            console.error("Conexão perdida com a database", error)
            process.exit(1)
        }
    }
}

module.exports = Database