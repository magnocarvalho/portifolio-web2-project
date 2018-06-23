"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    nome: { type: String },
    firebase: { type: String, required: true },
    razaoSocial: { type: String },
    tipoPessoa: { type: Array, "default": [] },
    inscricaoEstadual: { type: String },
    inscricaoMunicipal: { type: String },
    ramoAtividade: { type: String },
    descricao: { type: String },
    logo: { type: String },
    nomeContato: { type: String },
    email: { type: String, required: true },
    emailContato: { type: String },
    telefone: { type: String },
    celular: { type: String },
    rua: { type: String },
    numero: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    cidade: { type: mongoose.Schema.Types.ObjectId, ref: 'Cidades' },
    estado: { type: String },
    pais: { type: String },
    CEP: { type: String },
    candidatos: { type: Array, "default": [] },
    privacidade: { type: Boolean }
};
IDefault_1.Inject(schema);
exports.EmpresaSchema = new mongoose.Schema(schema);
exports.EmpresaModel = mongoose.model('Empresa', exports.EmpresaSchema, 'Empresa', false);
