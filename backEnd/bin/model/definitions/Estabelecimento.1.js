"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    nome: { type: String, required: true },
    endereco: { type: String },
    numero: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String },
    cep: { type: String },
    telefone: { type: String },
    email: { type: String },
    emailRespon: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    code: { type: String },
    limitUser: { type: Number },
    cnpj: { type: String },
    completeRegister: { type: Boolean, default: false },
    proximaCobranca: { type: Date },
    dtCadastro: { type: Date, default: new Date() },
    primeiraCobranca: { type: Date },
    valorMensal: { type: Number, default: 10 },
    idCielo: { type: String },
    Infinite: { type: Boolean, default: false },
    IdContabilidade: { type: mongoose.Schema.Types.ObjectId, ref: 'Contabilidade' },
    VinculoContabilidade: { type: Boolean, default: false }
};
IDefault_1.Inject(schema);
exports.EstabelecimentoSchema = new mongoose.Schema(schema);
exports.EstabelecimentoModel = mongoose.model('Estabelecimento', exports.EstabelecimentoSchema, 'Estabelecimento', false);
