const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  descricao: { type: String },
  ano: { type: String, required: true },
  combustivel: { type: String },
  quilometragem: { type: String },
  preco: { type: String },
  cor: { type: String },
  cambio: { type: String },
  cidade: { type: String },
  fipe: { type: String },
  imagemPrincipal: { type: String },
  galeria: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
