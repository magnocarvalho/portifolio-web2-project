"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    email: { type: String, required: true },
    firebase: { type: String, required: true },
    nome: { type: String },
    celular: { type: String },
    CPF: { type: String },
    dataNascimento: { type: Date },
    genero: { type: String },
    estadoCivil: { type: String },
    deficiencia: { type: Array, "default": [] },
    nacionalidade: { type: String },
    rua: { type: String },
    numero: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    cidade: { type: mongoose.Schema.Types.ObjectId, ref: 'Cidades' },
    estado: { type: String },
    pais: { type: String },
    CEP: { type: String },
    formacao: { type: String },
    nivelEscolaridade: { type: String },
    cursos: { type: Array, "default": [] },
    idiomas: { type: Array, "default": [] },
    experiencia: { type: Array, "default": [] },
    trabalhando: { type: Boolean },
    profissao: { type: String },
    areaInteresse: { type: String },
    preferencias: { type: Array, "default": [] },
    sobre: { type: String },
    vagas: { type: Array, "default": [] },
    privacidade: { type: Boolean }
};
IDefault_1.Inject(schema);
exports.CandidatoMasterSchema = new mongoose.Schema(schema);
exports.CandidatoModel = mongoose.model('Candidato', exports.CandidatoMasterSchema, 'Candidato', false);
