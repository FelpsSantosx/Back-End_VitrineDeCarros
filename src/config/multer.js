const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinary')

// console.log("✅ Cloudinary carregado:", cloudinary)

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'carros',
        format: async (req, file) => "jpeg", // ou "png", "jpg"
        // transformation: [{ width: 800, height: 600, crop: 'limit' }]
    }
})

const upload = multer({ storage })

module.exports = upload
