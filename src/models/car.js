const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  descricao: { type: String },
  ano: { type: Number, required: true },
  combustivel: { type: String },
  quilometragem: { type: Number },
  cor: { type: String },
  cambio: { type: String },
  cidade: { type: String },
  imagemPrincipal: { type: String },
  galeria: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
