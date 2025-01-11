const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileExtension = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`)
    },
})

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
        if(allowedMimeTypes.includes(file.mimetypes)) {
            cb(null, true)
        } else {
            cb (new Error("Tipo de arquivo não suportado. Apenas imagens são permitidas."), false)
        }
}

const upload = multer({
    storage,
    fileFilter,
})

module.exports = upload
