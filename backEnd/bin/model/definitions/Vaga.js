"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    logo: { type: String },
    titulo: { type: String },
    firebase: { type: String, required: true },
    descricaoVaga: { type: String },
    abertura: { type: Date },
    local: { type: Array, "default": [] },
    status: { type: String },
    horario: { type: Array, "default": [] },
    idiomas: { type: Array, "default": [] },
    modelo: { type: Array, "default": [] },
    formacao: { type: Array, "default": [] },
    palavra: { type: Array, "default": [] },
    mudanca: { type: Array, "default": [] }
};
IDefault_1.Inject(schema);
exports.VagaSchema = new mongoose.Schema(schema);
exports.VagaModel = mongoose.model('Vaga', exports.VagaSchema, 'Vaga', false);
