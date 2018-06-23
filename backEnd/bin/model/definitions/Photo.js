"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    nome: { type: String },
    photos: { type: Array } // arry com as fotos do album
};
IDefault_1.Inject(schema);
exports.photosMasterSchema = new mongoose.Schema(schema);
exports.photosModel = mongoose.model('Photos', exports.photosMasterSchema, 'photos', false);
