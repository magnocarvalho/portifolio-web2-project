"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    name: { type: String, required: true },
    ibge: { type: String },
    uf: { type: String }
};
IDefault_1.Inject(schema);
exports.CitySchema = new mongoose.Schema(schema);
exports.CityModel = mongoose.model('Cidades', exports.CitySchema, 'Cidades', false);
